import { useNavigate } from '@tanstack/react-router'
import { Menu, Moon, Sun, ShoppingCart, LogOut, User, Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '#/lib/auth-client'
import { removeLoginResponseFromStorage } from '#/shared/token-storage'
import { accountQueryOptions } from '#/features/users/account'
import { cartQueryOptions } from '#/features/cart/api'
import { unreadCountQueryOptions } from '#/features/notifications/api'
import { NotificationDropdown } from '#/features/notifications/NotificationDropdown'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

interface Props {
  locale: string
  onToggleSidebar: () => void
  isBuyer: boolean
}

function useDarkMode() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    if (isDark) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setDark((d) => {
      const next = !d
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return [dark, toggleDark] as const
}

export function Header({ locale, onToggleSidebar, isBuyer }: Props) {
  const navigate = useNavigate()
  const [dark, toggleDark] = useDarkMode()
  const { data: user } = useQuery(accountQueryOptions())
  const { data: cart } = useQuery({
    ...cartQueryOptions(),
    select: (data) => data?.cartItems.length ?? 0,
    enabled: isBuyer,
  })
  const cartCount = cart ?? 0
  const { data: unreadData } = useQuery(unreadCountQueryOptions())
  const unreadCount = unreadData?.count ?? 0
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!notifOpen) return
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [notifOpen])
  const currentLocale = getLocale()

  const handleSignOut = async () => {
    await authClient.signOut()
    removeLoginResponseFromStorage()
    navigate({ to: '/$locale/auth/login', params: { locale } })
  }

  const handleLocale = (next: string) => {
    setLocale(next as (typeof locales)[number], { reload: false })
    navigate({ params: (prev) => ({ ...prev, locale: next }) })
  }

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-card flex-shrink-0">
      {/* Left */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Locale switcher */}
        <div className="flex gap-1 mr-1">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleLocale(loc)}
              className={[
                'px-2 py-1 rounded text-xs font-medium transition-colors',
                loc === currentLocale
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              ].join(' ')}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={toggleDark}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications bell */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
        </div>

        {/* Cart — buyers only */}
        {isBuyer && (
          <button
            type="button"
            onClick={() => navigate({ to: '/$locale/cart', params: { locale } })}
            className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        )}

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="hidden sm:block text-xs font-medium text-foreground">
                {user
                  ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username
                  : '…'}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/$locale/users/$uuid',
                  params: { locale, uuid: user?.uuid ?? '' },
                })
              }
            >
              <User className="mr-2 h-4 w-4" />
              My profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
