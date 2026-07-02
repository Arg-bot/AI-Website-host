/**
 * Events.jsx
 * Lists all events. Registration modal sends no API call currently
 * (wire up createEventRegistration in api.js if your backend supports it).
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data'
import './Events.css'

export default function Events() {
  const [active, setActive]   = useState(null)
  const [form, setForm]       = useState({ name: '', email: '' })
  const [confirmed, setConfirmed] = useState(false)

  function openModal(event) {
    setActive(event)
    setForm({ name: '', email: '' })
    setConfirmed(false)
  }
  function closeModal() { setActive(null) }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: call api.createEventRegistration(active.id, form) when backend supports it
    setConfirmed(true)
  }

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Events</span>
          </div>
          <h1>Upcoming Events</h1>
          <p>Join us at conferences, workshops, and networking events across the UK.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="events-grid">
            {events.map(e => (
              <div key={e.id} className="event-card">
                <div className="event-date-badge">
                  <div className="day">{e.day}</div>
                  <div className="month">{e.month}</div>
                </div>
                <div className="event-body">
                  <span className="type-pill">{e.type}</span>
                  <h3>{e.title}</h3>
                  <p className="location">📍 {e.location}</p>
                  <p className="desc">{e.description}</p>
                  <div className="event-footer">
                    <span>{e.registrations} registered</span>
                    <button className="btn btn-blue btn-sm" onClick={() => openModal(e)}>Register</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration modal */}
      {active && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            {confirmed ? (
              <div className="confirmed">
                <div className="check-circle">✓</div>
                <h2>Registration Complete!</h2>
                <p>Thank you, {form.name}! We've sent confirmation to {form.email}.</p>
                <button className="btn btn-secondary mt-4" onClick={closeModal}>Close</button>
              </div>
            ) : (
              <>
                <h2>{active.title}</h2>
                <p className="event-meta-line">📅 {active.day} {active.month} · 📍 {active.location}</p>
                <form onSubmit={handleSubmit} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="form-group">
                    <label>Full Name <span>*</span></label>
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address <span>*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-blue" style={{ width: '100%' }}>
                    Complete Registration
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
