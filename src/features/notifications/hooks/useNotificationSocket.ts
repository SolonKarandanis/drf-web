import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getAccessTokenValue } from '#/shared/token-storage'

const WS_BASE = (import.meta.env.VITE_BACKEND_WS_URL ?? 'ws://localhost:8000/ws/') as string

const MAX_BACKOFF_MS = 30_000

export function useNotificationSocket(userUuid: string | undefined) {
  const queryClient = useQueryClient()
  const wsRef = useRef<WebSocket | null>(null)
  const attemptsRef = useRef(0)
  const intentionalCloseRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!userUuid) return

    intentionalCloseRef.current = false

    function connect() {
      const token = getAccessTokenValue()
      if (!token) return

      // Browsers cannot set custom headers on WebSocket upgrades; token goes as a query param.
      const url = `${WS_BASE}notification/${userUuid}/?token=${token}`
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        attemptsRef.current = 0
      }

      ws.onmessage = () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
      }

      ws.onclose = (event) => {
        wsRef.current = null
        if (intentionalCloseRef.current) return
        // 4001 = auth failure, don't reconnect
        if (event.code === 4001) return
        const delay = Math.min(1_000 * 2 ** attemptsRef.current, MAX_BACKOFF_MS)
        attemptsRef.current += 1
        timerRef.current = setTimeout(connect, delay)
      }
    }

    connect()

    return () => {
      intentionalCloseRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
      wsRef.current?.close()
    }
  }, [userUuid, queryClient])
}
