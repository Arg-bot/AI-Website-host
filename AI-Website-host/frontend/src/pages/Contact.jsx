/**
 * Contact.jsx
 *
 * On submit → POST /api/enquiries → navigate to /receipt with state
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createEnquiry } from '../services/api'
import './Contact.css'

const INITIAL = {
  name: '', email: '', phone: '', company: '',
  country: '', jobtitle: '', interest: '', details: '',
}

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [submitting, setSub]  = useState(false)
  const [apiError, setApiErr] = useState('')
  const navigate              = useNavigate()

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const required = ['name', 'email', 'phone', 'company', 'country', 'interest']
    const errs = {}
    required.forEach(k => { if (!form[k].trim()) errs[k] = 'This field is required' })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSub(true)
    setApiErr('')
    try {
      // Generate a local ref for offline fallback
      const ref = `AIS-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`
      const payload = { ...form, ref, date: new Date().toISOString(), status: 'New' }

      let saved
      try {
        saved = await createEnquiry(payload)
      } catch {
        // If backend is offline, proceed with local data
        saved = payload
      }

      navigate('/receipt', { state: saved || payload })
    } finally {
      setSub(false)
    }
  }

  function field(name, label, required, type = 'text', placeholder = '') {
    return (
      <div className={`form-group${errors[name] ? ' error' : ''}`}>
        <label>{label}{required && <span> *</span>}</label>
        <input
          type={type}
          value={form[name]}
          placeholder={placeholder}
          onChange={e => set(name, e.target.value)}
        />
        {errors[name] && <div className="error-text">{errors[name]}</div>}
      </div>
    )
  }

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Contact</span>
          </div>
          <h1>Get in Touch</h1>
          <p>Ready to explore how AI can transform your business?</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* ─ Info ─ */}
            <div className="contact-info">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <div className="ci-icon">📍</div>
                  <div><h4>Visit Us</h4><p>10 Innovation Quarter<br />Sunderland SR1 1AA<br />United Kingdom</p></div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon">📞</div>
                  <div><h4>Call Us</h4><p><a href="tel:+44191000000">+44 191 000 0000</a></p></div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon">✉️</div>
                  <div><h4>Email Us</h4><p><a href="mailto:info@ai-solutions.co.uk">info@ai-solutions.co.uk</a></p></div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon">🕐</div>
                  <div><h4>Office Hours</h4><p>Monday – Friday: 9:00 AM – 6:00 PM GMT</p></div>
                </div>
              </div>
            </div>

            {/* ─ Form ─ */}
            <div className="contact-form-card">
              <h3>Send Us an Enquiry</h3>
              {apiError && <div className="api-error">{apiError}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  {field('name',    'Full Name',     true,  'text',  'Your full name')}
                  {field('email',   'Email Address', true,  'email', 'you@company.com')}
                </div>
                <div className="form-row">
                  {field('phone',   'Phone Number',  true,  'tel',   '+44 7911 123456')}
                  {field('company', 'Company Name',  true,  'text',  'Your company')}
                </div>
                <div className="form-row">
                  <div className={`form-group${errors.country ? ' error' : ''}`}>
                    <label>Country <span>*</span></label>
                    <select value={form.country} onChange={e => set('country', e.target.value)}>
                      <option value="">Select your country</option>
                      {['United Kingdom','United States','Canada','Australia','Germany','France',
                        'Netherlands','Sweden','Norway','Denmark','Finland','Ireland','Spain',
                        'Italy','Portugal','India','Japan','Singapore','United Arab Emirates','Other']
                        .map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.country && <div className="error-text">{errors.country}</div>}
                  </div>
                  {field('jobtitle','Job Title', false, 'text', 'Your job title')}
                </div>

                <div className={`form-group${errors.interest ? ' error' : ''}`}>
                  <label>I'm Interested In <span>*</span></label>
                  <select value={form.interest} onChange={e => set('interest', e.target.value)}>
                    <option value="">Select an option</option>
                    {['AI Virtual Assistant','Schedule a Personalised Demo','Join an Event',
                      'Rapid Prototyping','Data Analytics','General Enquiry']
                      .map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.interest && <div className="error-text">{errors.interest}</div>}
                </div>

                <div className="form-group">
                  <label>Job Details</label>
                  <textarea
                    value={form.details}
                    onChange={e => set('details', e.target.value)}
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
