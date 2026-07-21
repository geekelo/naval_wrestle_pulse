const API_BASE = 'https://naval-wrestle-pulse-api.onrender.com'

async function parseResponse(response) {
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

function authHeaders(token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function apiPost(path, body, { token } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(body),
  })
  return parseResponse(response)
}

export async function apiGet(path, { token } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: authHeaders(token),
  })
  return parseResponse(response)
}
