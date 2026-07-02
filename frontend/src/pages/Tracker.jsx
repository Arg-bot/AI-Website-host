/**
 * Tracker.jsx — calls GET /api/enquiries and matches by reference number
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getEnquiries } from '../services/api'
import './Tracker.css'

const STEPS = [
  'Enquiry Received',
  'Initial Review',
  'Assigned to Account Manager',
  'Demo Scheduled',
  'Proposal Delivered',
]

const STATUS_INDEX = { New: 0, 'In Progress': 2, Pending: 3, Closed: 4 }

export default function Tracker() {
  const [ref, setRef]       = useState('')
  const [result, setResult] = useState(null)   // enquiry object | 'not-found'
  const [loading, setLoad]  = useState(false)

  async function track() {
    const input = ref.trim().toUpperCase()
    if (!input) return
    setLoad(true)
    try {
      const enquiries = await getEnquiries()
      const found = enquiries.find(e => e.ref === input)
      setResult(found || 'not-found')
    } catch {
      // Try localStorage fallback
      const cached = localStorage.getItem('ai_enquiries')
      if (cached) {
        const found = JSON.parse(cached).find(e => e.ref === input)
        setResult(found || 'not-found')
      } else {
        setResult('not-found')
      }
    } finally {
      setLoad(false)
    }
  }

  const currentStep = result && result !== 'not-found'
    ? STATUS_INDEX[result.status] ?? 0
    : 0

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Track Enquiry</span>
          </div>
          <h1>Track Your Enquiry</h1>
          <p>Enter your reference number to check the status of your enquiry.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="tracker-container">
            <div className="tracker-search">
              <input
                value={ref}
                onChange={e => setRef(e.target.value)}
                placeholder="e.g. AIS-2025-001"
                onKeyDown={e => e.key === 'Enter' && track()}
              />
              <button className="btn btn-blue" onClick={track} disabled={loading}>
                {loading ? 'Searching…' : 'Track'}
              </button>
            </div>

            {result === 'not-found' && (
              <div className="not-found">
                <p style={{ fontSize: '3rem' }}>🔍</p>
                <h3>Enquiry Not Found</h3>
                <p>Please check your reference number and try again.</p>
              </div>
            )}

            {result && result !== 'not-found' && (
              <div className="tracker-timeline">
                {STEPS.map((step, i) => (
                  <div key={step} className="timeline-step">
                    <div className={`timeline-dot ${i < currentStep ? 'done' : i === currentStep ? 'current' : ''}`} />
                    <div className="timeline-content">
                      <h4>{step}</h4>
                      <p>
                        {i < currentStep
                          ? 'Completed'
                          : i === currentStep
                          ? `Current status: ${result.status}`
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
