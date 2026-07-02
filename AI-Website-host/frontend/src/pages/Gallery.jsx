import { useState } from 'react'
import { Link } from 'react-router-dom'
import { gallery } from '../data'
import './Gallery.css'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Gallery</span>
          </div>
          <h1>Event Gallery</h1>
          <p>Relive the moments from our conferences, workshops, and community events.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {gallery.map(g => (
              <div key={g.id} className="gallery-item" onClick={() => setLightbox(g)}>
                <img src={g.image} alt={g.title} loading="lazy" />
                <div className="gallery-overlay">
                  <h3>{g.title}</h3>
                  <span>{g.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} />
            <div className="lightbox-info">
              <h2>{lightbox.title}</h2>
              <div className="lb-meta">
                <span>{lightbox.date}</span>
                <span>{lightbox.location}</span>
              </div>
              <p>{lightbox.description}</p>
              <div className="lb-tags">
                {lightbox.tags.map(t => <span key={t} className="lb-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
