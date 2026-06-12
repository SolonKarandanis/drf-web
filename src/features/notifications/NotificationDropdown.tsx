import { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import {
  markNotificationsRead,
  notificationsInfiniteQueryOptions,
} from './api'
import type { NotificationEventType } from './models'

const EVENT_LABELS: Record<NotificationEventType, () => string> = {
  'purchase.order.created': () => m.notification_order_created(),
  'purchase.order.buyer.rejected': () => m.notification_order_buyer_rejected(),
  'purchase.order.supplier.rejected': () => m.notification_order_supplier_rejected(),
  'purchase.order.approved': () => m.notification_order_approved(),
  'purchase.order.shipped': () => m.notification_order_shipped(),
  'purchase.order.received': () => m.notification_order_received(),
}

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

interface Props {
  onClose: () => void
}

export function NotificationDropdown({ onClose }: Props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { locale } = useParams({ strict: false }) as { locale: string }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(notificationsInfiniteQueryOptions())

  const pendingIds = useRef<Set<number>>(new Set())
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flushMarkAsRead = useCallback(() => {
    const ids = [...pendingIds.current]
    if (ids.length === 0) return
    pendingIds.current.clear()
    markNotificationsRead(ids).then(() => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
    })
  }, [queryClient])

  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.notificationId)
            if (id) {
              pendingIds.current.add(id)
              if (debounceTimer.current) clearTimeout(debounceTimer.current)
              debounceTimer.current = setTimeout(flushMarkAsRead, 500)
            }
          }
        })
      },
      { threshold: 0.5 },
    )
    return () => {
      observerRef.current?.disconnect()
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [flushMarkAsRead])

  const registerItem = useCallback((el: HTMLElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el)
    }
  }, [])

  const allNotifications = data?.pages.flatMap((p) => p.results) ?? []

  return (
    <div className="absolute right-0 top-full mt-1 w-80 rounded-md border border-border bg-card shadow-lg z-50 flex flex-col max-h-[480px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-sm font-semibold">{m.notification_title()}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {isLoading && (
          <p className="text-center text-sm text-muted-foreground py-8">Loading…</p>
        )}

        {!isLoading && allNotifications.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            {m.notification_empty()}
          </p>
        )}

        {allNotifications.map((n) => {
          const orderUuid = n.payload.order_uuid as string | undefined
          const orderTotal = n.payload.order_total as number | undefined
          return (
            <div
              key={n.id}
              ref={n.read_at ? null : registerItem}
              data-notification-id={n.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                onClose()
                if (orderUuid) {
                  navigate({
                    to: '/$locale/orders/$uuid',
                    params: { locale, uuid: orderUuid },
                  })
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.click()
              }}
              className={[
                'px-4 py-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted transition-colors',
                !n.read_at ? 'bg-primary/5' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {EVENT_LABELS[n.event_type]?.() ?? n.event_type}
                  </p>
                  {orderTotal !== undefined && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Total: €{orderTotal.toFixed(2)}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                  {relativeTime(n.created_at)}
                </span>
              </div>
              {!n.read_at && (
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </div>
          )
        })}

        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isFetchingNextPage ? 'Loading…' : m.notification_load_more()}
          </button>
        )}
      </div>
    </div>
  )
}
