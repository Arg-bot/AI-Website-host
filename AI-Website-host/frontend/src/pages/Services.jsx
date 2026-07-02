/**
 * Services.jsx
 *
 * TODO: Add service detail modal (openServiceModal logic from original)
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data'
import './Services.css'

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <h1>AI Services</h1>
          <p>Comprehensive artificial intelligence solutions designed to address real business challenges.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-full-grid">
            {services.map(s => (
              <div
                key={s.id}
                className="service-card-full"
                onClick={() => setSelected(s)}
              >
                <div className="service-icon-sm" style={{ background: s.color }} />
                <div className="service-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.shortDesc}</p>
                  <ul className="feature-list">
                    {s.features.slice(0, 3).map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="service-footer">
                    <span className="price">{s.price}</span>
                    <span className="service-link">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service detail modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-icon-lg" style={{ background: selected.color }} />
            <h2>{selected.title}</h2>
            <p className="modal-desc">{selected.description}</p>
            <h3>Key Features</h3>
            <ul className="modal-features">
              {selected.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="modal-meta">
              <div><span>Starting From</span><strong>{selected.price}</strong></div>
              <div><span>Timeline</span><strong>{selected.timeline}</strong></div>
            </div>
            <Link to="/contact" className="btn btn-blue" style={{ width: '100%', textAlign: 'center' }} onClick={() => setSelected(null)}>
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
