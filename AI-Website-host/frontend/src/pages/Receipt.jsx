import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Receipt.css'

export default function Receipt() {
  const { state: data } = useLocation()
  const navigate = useNavigate()

  if (!data) {
    return (
      <main style={{ paddingTop: 80, textAlign: 'center', padding: '160px 24px' }}>
        <h2>No receipt data found.</h2>
        <button className="btn btn-blue mt-4" onClick={() => navigate('/contact')}>
          Back to Contact
        </button>
      </main>
    )
  }

  const date = new Date(data.date).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const fields = [
    ['Full Name',  data.name],
    ['Email',      data.email],
    ['Phone',      data.phone],
    ['Company',    data.company],
    ['Country',    data.country],
    ['Interest',   data.interest],
    data.jobtitle && ['Job Title', data.jobtitle],
    data.details  && ['Details',   data.details],
  ].filter(Boolean)

  return (
    <main style={{ paddingTop: 80 }}>
      <section className="section">
        <div className="container">
          <div className="receipt-container">
            <div className="receipt-header">
              <div>
                <div className="receipt-logo">AI-Solutions</div>
                <p>10 Innovation Quarter, Sunderland SR1 1AA</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Enquiry Receipt</h2>
                <p>{date}</p>
              </div>
            </div>

            <div className="receipt-ref">
              <span>Your Reference Number</span>
              <strong>{data.ref}</strong>
            </div>

            <div className="receipt-details">
              {fields.map(([label, value]) => (
                <div key={label} className="receipt-detail">
                  <label>{label}</label>
                  <p>{value}</p>
                </div>
              ))}
            </div>

            <div className="receipt-actions">
              <button className="btn btn-secondary" onClick={() => window.print()}>Print Receipt</button>
              <Link to="/tracker" className="btn btn-blue">Track Your Enquiry</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
