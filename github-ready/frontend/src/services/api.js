/**
 * api.js — Central API layer
 *
 * All communication with the Express backend goes through here.
 * Base URL is /api (proxied to http://localhost:3000/api by Vite in dev).
 * In production, set VITE_API_URL in your .env file.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, options)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }

  return res.json()
}

// ─── Health ──────────────────────────────────────────────────────────────────

export const checkHealth = () => request('GET', '/health')

// ─── Enquiries ───────────────────────────────────────────────────────────────

export const getEnquiries = () => request('GET', '/enquiries')

export const createEnquiry = (data) => request('POST', '/enquiries', data)

export const updateEnquiryStatus = (id, status) =>
  request('PATCH', `/enquiries/${id}/status`, { status })

export const seedEnquiries = () => request('POST', '/enquiries/seed')

export const deleteAllEnquiries = () => request('DELETE', '/enquiries')

// ─── Convenience default export ──────────────────────────────────────────────

const api = {
  checkHealth,
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  seedEnquiries,
  deleteAllEnquiries,
}

export default api
