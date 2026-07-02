# AI-Solutions Web Application Specification

## 1. Concept & Vision

AI-Solutions is a premium UK-based artificial intelligence consultancy delivering enterprise-grade AI services to businesses across industries. The web presence should feel like a sophisticated, trustworthy technology partner — confident, modern, and results-driven. The overall experience communicates innovation, expertise, and accessibility, making advanced AI approachable for decision-makers who may not be technically inclined.

## 2. Design Language

### Aesthetic Direction
Premium SaaS/enterprise with a clean, confident identity. Think Stripe meets IBM — technically credible but warmly professional. No startup playfulness, no corporate stiffness.

### Color Palette
- **Primary Navy**: `#042C53` — headers, hero overlays, admin sidebar, authority
- **Mid Blue**: `#185FA5` — CTAs, links, interactive elements
- **Teal**: `#1D9E75` — success states, highlights, reference numbers
- **Green**: `#639922` — secondary accents, positive indicators
- **Background White**: `#FFFFFF` — main content areas
- **Light Grey**: `#f4f6f9` — alternating sections, card backgrounds
- **Text Dark**: `#1a1a2e` — body copy
- **Text Muted**: `#6b7280` — secondary text, captions

### Typography
- **Headings**: Syne (800 weight) — geometric, distinctive, modern
- **Body**: DM Sans (400, 500, 600) — clean, highly readable
- **Fallbacks**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Card padding: 24px-32px
- Gap between cards: 24px
- Border radius: 8px (cards), 12px (modals), 4px (buttons/inputs)

### Motion Philosophy
- Hover transitions: 200ms ease-out
- Page transitions: 300ms fade
- Micro-interactions: 150ms for immediate feedback
- Stat counters: 2s count-up animation on load
- Scroll-triggered reveals: 400ms slide-up with 100ms stagger

### Visual Assets
- Icons: CSS-drawn 40×40 squares with centered SVG shapes (no emoji)
- Images: Real Unsplash photos with specific URLs provided
- Decorative: Subtle gradient overlays, soft shadows (0 4px 20px rgba(0,0,0,0.08))

## 3. Layout & Structure

### Page Architecture
Single-page application with hash-based routing via `go('page-id')`:
- **Home**: Hero → What We Do → Services Preview → Why Choose Us → Events Preview → Testimonials → Partners → Pricing → Insights → CTA Banner → Footer
- **Services**: Hero strip → 9-card grid → Detail modals
- **Events**: Hero strip → 9 event cards → Registration modals
- **Gallery**: Hero strip → 12-photo masonry grid → Lightbox
- **Contact**: Hero strip → Two-column (info + form)
- **Receipt**: Print-ready confirmation layout
- **Tracker**: Search → Timeline display
- **Admin**: Login → Dashboard/Enquiries/Reports/Events/Services/Database/Settings

### Responsive Strategy
- Desktop: 1440px max-width container, 3-column grids
- Tablet (768px-1024px): 2-column grids, collapsible sidebar
- Mobile (<768px): Single column, hamburger nav, bottom sheet chatbot

## 4. Features & Interactions

### Navigation
- Sticky header with logo, nav links, "Get Started" CTA
- Mobile: Hamburger → full-screen overlay menu with animated transitions
- Active page indicator (underline)

### Hero Section
- Full-viewport with Unsplash background (85% dark overlay)
- Animated stat counters on load (200+ Clients, 98% Satisfaction, 50+ Solutions)
- Two CTAs: "Explore Services" (primary) and "Book a Demo" (secondary)

### Services
- 9 services in 3×3 grid with CSS icon, title, one-liner
- Click opens full-screen modal with complete details, features, pricing, timeline
- "Related Services" row at bottom of modal

### Events
- 9 event cards with date badge, title, location, type pill
- Registration modal with pre-filled event info
- Confirmation with unique booking reference (EVT-2025-001 etc.)

### Gallery
- Masonry grid (3/2/1 columns responsive)
- Hover overlay with event name/date
- Lightbox with full details, tags, CTA

### Contact Form
- Real-time validation on blur
- Fields: Name*, Email*, Phone*, Company*, Country (dropdown), Job Title, Interest (dropdown)*, Details
- POST to `/api/enquiries` → Receipt page

### Admin Panel
- Protected by username/password (admin/admin123)
- Live KPIs from MongoDB
- Status change dropdowns (PATCH endpoint)
- Seed/Reset database actions
- Connection status indicator

### AI Chatbot (Aria)
- Floating button, 360px chat window
- Integrates with Anthropic Claude API
- Typing indicator, conversation history
- "Talk to a human" fallback

### PWA
- manifest.json with icons
- Service worker for offline caching
- Install banner

## 5. Component Inventory

### Buttons
- Primary: Navy background, white text, hover darken 10%
- Secondary: White background, navy border, hover fill
- Ghost: Transparent, underline on hover
- States: Default, hover, active (scale 0.98), disabled (opacity 0.5)

### Cards
- White background, 8px radius, soft shadow
- Hover: lift (translateY -4px), shadow increase
- Active state for selectable cards

### Form Inputs
- 48px height, 8px radius, 1px border #ddd
- Focus: border blue, subtle glow
- Error: red border, error message below
- Disabled: grey background

### Status Badges
- New: Blue pill
- In Progress: Teal pill
- Pending: Amber pill
- Closed: Green pill

### Modal/Lightbox
- Centered overlay, max-width 800px
- Dark backdrop (rgba(0,0,0,0.6))
- Close button top-right
- Escape key closes

### Tables
- Striped rows (alternating #f9f9f9)
- Sticky header
- Horizontal scroll wrapper
- Hover row highlight

### Timeline
- Vertical line connecting steps
- Filled circle (complete), ring (current), empty (pending)
- Animated progress on load

## 6. Technical Approach

### Frontend
- Vanilla HTML/CSS/JS
- CSS custom properties for theming
- Hash-based SPA routing
- Fetch API for backend communication
- localStorage as fallback cache

### Backend (server.js)
- Node.js + Express on port 3001
- Mongoose ODM for MongoDB
- RESTful endpoints as specified
- CORS enabled for all origins
- Environment variables via dotenv

### API Design
```
GET    /api/enquiries          — List all (sorted desc)
POST   /api/enquiries          — Create new
PATCH  /api/enquiries/:ref/status — Update status
DELETE /api/enquiries          — Delete all
POST   /api/enquiries/seed     — Seed 20 records
GET    /api/health             — Health check
```

### Data Model
```javascript
{
  ref: String (unique, AIS-YYYY-NNN),
  name: String,
  email: String,
  phone: String,
  company: String,
  country: String,
  jobtitle: String,
  interest: String,
  details: String,
  date: String,
  status: enum ['New','In Progress','Pending','Closed'],
  createdAt: Date
}
```

### Deployment
- Frontend: Static hosting (Netlify, Vercel, GitHub Pages)
- Backend: Node.js hosting (Railway, Render, Heroku)
- Database: MongoDB Atlas free tier
