import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header  from './components/Header'
import Home    from './pages/Home'
import Services from './pages/Services'
import Events  from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Receipt from './pages/Receipt'
import Tracker from './pages/Tracker'
import Admin   from './pages/Admin'
import './styles/global.css'

// Google Fonts loaded here so they're available everywhere
const FONTS = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap'
const link = document.createElement('link')
link.rel  = 'stylesheet'
link.href = FONTS
document.head.appendChild(link)

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"        element={<Home />}     />
        <Route path="/services"element={<Services />} />
        <Route path="/events"  element={<Events />}   />
        <Route path="/gallery" element={<Gallery />}  />
        <Route path="/contact" element={<Contact />}  />
        <Route path="/receipt" element={<Receipt />}  />
        <Route path="/tracker" element={<Tracker />}  />
        <Route path="/admin"   element={<Admin />}    />

        {/* 404 fallback */}
        <Route path="*" element={
          <main style={{ paddingTop: 80, textAlign: 'center', padding: '160px 24px' }}>
            <h2 style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>404 — Page not found</h2>
            <a href="/" className="btn btn-blue" style={{ display: 'inline-flex', marginTop: 24 }}>Go Home</a>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}
