import { ApiError } from './apiError'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function request<T>(method: HttpMethod, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let payload = { code: String(res.status), message: res.statusText, details: undefined }
    try {
      payload = await res.json()
    } catch {
      // use default payload
    }
    throw new ApiError(payload)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const httpClient = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body: unknown) => request<T>('POST', url, body),
  patch: <T>(url: string, body: unknown) => request<T>('PATCH', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
}