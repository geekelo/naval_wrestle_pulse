const API_BASE = 'https://naval-wrestle-pulse-api.onrender.com'

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    const message =
      data?.errors?.join?.(', ') ||
      data?.error ||
      data?.message ||
      `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}
