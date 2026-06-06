import { Mutex } from 'async-mutex'
import {
  getAccessTokenValue,
  getRefreshTokenValue,
  setStorageValue,
} from '#/shared/token-storage'
import { ApiControllers } from './api-controllers'

const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/'
const mutex = new Mutex()

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`HTTP ${status}`)
  }
}

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!text) return undefined as T
  try {
    return JSON.parse(text) as T
  } catch {
    return undefined as T
  }
}

function buildUrl(path: string): string {
  return path.startsWith('http') ? path : `${baseUrl}${path}`
}

function applyAuthHeader(options: RequestInit, token: string | null): RequestInit {
  if (!token) return options
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${token}`)
  return { ...options, headers }
}

async function doFetch(url: string, options: RequestInit): Promise<Response> {
  return fetch(buildUrl(url), { credentials: 'include', ...options })
}

// Authenticated requests. On 401, acquires a mutex, refreshes the access token
// once, then retries. The token is read fresh after the refresh so stale closures
// never clobber a just-refreshed token.
export async function fetchWithAuth<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  await mutex.waitForUnlock()

  const token = getAccessTokenValue()
  let response = await doFetch(url, applyAuthHeader(options, token))

  if (response.status === 401) {
    const refresh = getRefreshTokenValue()
    if (!refresh) {
      const body = await parseResponse<unknown>(response)
      throw new HttpError(response.status, body)
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResponse = await doFetch(`${ApiControllers.AUTH}/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh }),
        })
        if (refreshResponse.ok) {
          const data = await parseResponse<{ access: string }>(refreshResponse)
          if (data?.access) {
            setStorageValue('access', data.access)
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
    }

    // Re-read token fresh after refresh — must not use the captured `token` closure
    const freshToken = getAccessTokenValue()
    response = await doFetch(url, applyAuthHeader(options, freshToken))
  }

  if (!response.ok) {
    const body = await parseResponse<unknown>(response)
    throw new HttpError(response.status, body)
  }

  return parseResponse<T>(response)
}

// Public (unauthenticated) requests. No auth header, no refresh logic.
export async function fetchPublic<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await doFetch(url, options)
  if (!response.ok) {
    const body = await parseResponse<unknown>(response)
    throw new HttpError(response.status, body)
  }
  return parseResponse<T>(response)
}
