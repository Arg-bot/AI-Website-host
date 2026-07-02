/**
 * Admin.jsx
 *
 * Sections: dashboard | enquiries | events | services
 * All data fetched from /api/enquiries via the API service.
 */

import { useState, useEffect, useCallback } from 'react'
import { services, events } from '../data'
import {
  getEnquiries,
  updateEnquiryStatus,
  checkHealth,
} from '../services/api'
import './Admin.css'

const SECTIONS = [
  { id: 'dashboard',  label: 'Dashboard'  },
  { id: 'enquiries',  label: 'Enquiries'  },
  { id: 'events',     label: 'Events'     },
  { id: 'services',   label: 'Services'   },
]

export default function Admin() {
  const [loggedIn, setLoggedIn]   = useState(false)
  const [creds, setCreds]         = useState({ username: '', password: '' })
  const [loginErr, setLoginErr]   = useState(false)
  const [section, setSection]     = useState('dashboard')
  const [enquiries, setEnquiries] = useState([])
  const [online, setOnline]       = useState(false)
  const [statusFilter, setFilter] = useState('')

  const load = useCallback(async () => {
    try {
      await checkHealth()
      setOnline(true)
    } catch { setOnline(false) }

    try {
      const data = await getEnquiries()
      setEnquiries(data)
      localStorage.setItem('ai_enquiries', JSON.stringify(data))
    } catch {
      const cached = localStorage.getItem('ai_enquiries')
      if (cached) setEnquiries(JSON.parse(cached))
    }
  }, [])

  useEffect(() => { if (loggedIn) load() }, [loggedIn, load])

  function login(e) {
    e.preventDefault()
    if (creds.username === import.meta.env.VITE_ADMIN_USER && creds.password === import.meta.env.VITE_ADMIN_PASS) {
      setLoggedIn(true)
      setLoginErr(false)
    } else {
      setLoginErr(true)
    }
  }

  async function changeStatus(enquiry, status) {
    try {
      if (enquiry.ref) await updateEnquiryStatus(enquiry.ref, status)
    } catch {}
    setEnquiries(prev =>
      prev.map(e => e.ref === enquiry.ref ? { ...e, status } : e)
    )
  }

  function exportCsv() {
    const headers = ['Ref','Name','Email','Phone','Company','Country','Interest','Status','Date']
    const rows = enquiries.map(e => [
      e.ref, e.name, e.email, e.phone, e.company, e.country,
      e.interest, e.status, new Date(e.createdAt || e.date).toLocaleDateString(),
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `enquiries-${new Date().toISOString().split('T')[0]}.csv`,
    })
    a.click()
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!loggedIn) return (
    <main style={{ paddingTop: 80 }} className="admin-login-page">
      <div className="login-card">
        <h2>Admin Portal</h2>
        <p>Sign in to access the management dashboard</p>
        {loginErr && <div className="login-error">Invalid username or password.</div>}
        <form onSubmit={login}>
          <div className="form-group">
            <label>Username</label>
            <input value={creds.username} onChange={e => setCreds(c => ({...c, username: e.target.value}))} placeholder="Username" required />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Password</label>
            <input type="password" value={creds.password} onChange={e => setCreds(c => ({...c, password: e.target.value}))} placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
        </form>
        <div className="demo-creds">
          <strong>Demo:</strong> admin / admin123
        </div>
      </div>
    </main>
  )

  const filtered = statusFilter ? enquiries.filter(e => e.status === statusFilter) : enquiries

  // ── Admin dashboard ────────────────────────────────────────────────────────
  return (
    <main style={{ paddingTop: 80 }} className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`admin-nav-item${section === s.id ? ' active' : ''}`}
            onClick={() => setSection(s.id)}
          >
            {s.label}
          </button>
        ))}
        <button className="admin-nav-item logout" onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-topbar">
          <h2>{SECTIONS.find(s => s.id === section)?.label}</h2>
          <div className={`conn-badge ${online ? 'connected' : 'offline'}`}>
            <span className="conn-dot" />
            {online ? 'MongoDB Connected' : 'Local Cache'}
          </div>
        </div>

        {/* ── Dashboard ── */}
        {section === 'dashboard' && (
          <div>
            <div className="kpi-row">
              {[
                ['Total Enquiries', enquiries.length],
                ['Demo Requests',   enquiries.filter(e => e.interest === 'Schedule a Personalised Demo').length],
                ['Event Sign-ups',  enquiries.filter(e => e.interest === 'Join an Event').length],
                ['Closed',          enquiries.filter(e => e.status === 'Closed').length],
                ['Open',            enquiries.filter(e => e.status !== 'Closed').length],
              ].map(([label, val]) => (
                <div key={label} className="kpi-card">
                  <div className="kpi-label">{label}</div>
                  <div className="kpi-value">{val}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Recent Enquiries</h3>
              <EnquiriesTable rows={[...enquiries].sort((a,b) => new Date(b.date||b.createdAt) - new Date(a.date||a.createdAt)).slice(0,5)} onStatusChange={changeStatus} />
            </div>
          </div>
        )}

        {/* ── Enquiries ── */}
        {section === 'enquiries' && (
          <div>
            <div className="enq-header">
              <select className="filter-select" value={statusFilter} onChange={e => setFilter(e.target.value)}>
                <option value="">All Statuses</option>
                {['New','In Progress','Pending','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{filtered.length} enquiries</span>
                <button className="btn btn-secondary btn-sm" onClick={exportCsv}>Export CSV</button>
              </div>
            </div>
            <div className="card overflow-x">
              <EnquiriesTable rows={filtered} onStatusChange={changeStatus} showAll />
            </div>
          </div>
        )}

        {/* ── Events ── */}
        {section === 'events' && (
          <div className="card overflow-x">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Type</th><th>Registrations</th><th>Status</th></tr></thead>
              <tbody>
                {events.map(e => (
                  <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.date}</td>
                    <td>{e.location}</td>
                    <td>{e.type}</td>
                    <td>{e.registrations}</td>
                    <td><span className={`status-badge ${new Date(e.date) < new Date() ? 'closed' : 'new'}`}>{new Date(e.date) < new Date() ? 'Past' : 'Upcoming'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Services ── */}
        {section === 'services' && (
          <div className="card overflow-x">
            <table className="admin-table">
              <thead><tr><th>Service</th><th>Starting Price</th><th>Enquiries</th><th>Status</th></tr></thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td>{s.title}</td>
                    <td>{s.price}</td>
                    <td>{enquiries.filter(e => e.interest === s.title).length}</td>
                    <td><span className="status-badge new">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

// ── Reusable table component ──────────────────────────────────────────────────
function EnquiriesTable({ rows, onStatusChange, showAll }) {
  if (!rows.length) return <p style={{ padding: 16, color: 'var(--text-muted)' }}>No enquiries found.</p>
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Ref</th><th>Name</th><th>Company</th>
          {showAll && <><th>Country</th><th>Interest</th></>}
          <th>Date</th><th>Status</th>
          {showAll && <th>Change</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map(e => (
          <tr key={e.ref}>
            <td>{e.ref}</td>
            <td>{e.name}</td>
            <td>{e.company}</td>
            {showAll && <><td>{e.country}</td><td>{e.interest}</td></>}
            <td>{new Date(e.createdAt || e.date).toLocaleDateString()}</td>
            <td><span className={`status-badge ${(e.status||'new').toLowerCase().replace(' ','-')}`}>{e.status}</span></td>
            {showAll && (
              <td>
                <select
                  className="status-select"
                  value={e.status}
                  onChange={ev => onStatusChange(e, ev.target.value)}
                >
                  {['New','In Progress','Pending','Closed'].map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
