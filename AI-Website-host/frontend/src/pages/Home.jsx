/**
 * Home.jsx
 *
 * TODO: Port sections from original index.html:
 *   - Hero
 *   - What We Do
 *   - Services Preview (use data/index.js → services)
 *   - Why Choose Us
 *   - Events Preview (use data/index.js → events)
 *   - Testimonials
 *   - Partners ticker
 *   - Latest Insights
 *   - CTA Banner
 */

import { useNavigate } from 'react-router-dom'
import { services } from '../data'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="home">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>Transform Your Business with Intelligent AI Solutions</h1>
          <p className="hero-subtitle">
            AI-Solutions delivers enterprise-grade artificial intelligence services
            that drive efficiency, reduce costs, and unlock new opportunities for growth.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => navigate('/services')}>
              Explore Services
            </button>
            <button
              className="btn btn-secondary"
              style={{ borderColor: 'white', color: 'white' }}
              onClick={() => navigate('/contact')}
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────── */}
      <section className="section section-grey">
        <div className="container">
          <div className="section-header">
            <h2>Our AI Services</h2>
            <p>Comprehensive artificial intelligence solutions for real business challenges.</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 6).map(s => (
              <div key={s.id} className="service-card">
                <div className="service-icon" style={{ background: s.color }} />
                <h3>{s.title}</h3>
                <p>{s.shortDesc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn btn-blue" onClick={() => navigate('/services')}>
              View All Services
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
