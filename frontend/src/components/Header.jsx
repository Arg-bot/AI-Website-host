import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <button className="logo" onClick={() => { navigate('/'); close() }}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            AI-Solutions
          </button>

          {/* Desktop nav */}
          <nav className="nav">
            <NavLink to="/"        className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end>Home</NavLink>
            <NavLink to="/services"className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Services</NavLink>
            <NavLink to="/events"  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Events</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Gallery</NavLink>
            <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Contact</NavLink>
          </nav>

          <div className="header-cta">
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/contact')}>
              Get Started
            </button>
            <button
              className={`hamburger${menuOpen ? ' active' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/"        onClick={close}>Home</NavLink>
          <NavLink to="/services"onClick={close}>Services</NavLink>
          <NavLink to="/events"  onClick={close}>Events</NavLink>
          <NavLink to="/gallery" onClick={close}>Gallery</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/admin"   onClick={close}>Admin</NavLink>
        </div>
      )}
    </>
  )
}
