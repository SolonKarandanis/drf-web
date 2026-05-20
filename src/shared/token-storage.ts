// JWT payloads use base64url (RFC 4648 §5), not standard base64.
// atob() only handles standard base64, so we must convert before decoding.
export function decodeJwtPayload(token: string): Record<string, unknown> {
  const part = token.split('.')[1]
  if (!part) throw new Error('Invalid JWT: missing payload segment')
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  return JSON.parse(atob(padded))
}

function getStorageValue(key: string) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
    return null
  }
  return null
}

export function setStorageValue(key: string, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function removeStorageValue(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export function getAccessTokenValue(): string | null {
  return getStorageValue('access')
}

export function getRefreshTokenValue(): string | null {
  return getStorageValue('refresh')
}

export function setLoginResponseInStorage(response: { access: string; refresh: string }) {
  setStorageValue('access', response.access)
  setStorageValue('refresh', response.refresh)
}

export function removeLoginResponseFromStorage() {
  removeStorageValue('access')
  removeStorageValue('refresh')
}
