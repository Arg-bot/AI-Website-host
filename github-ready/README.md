# AI-Solutions

Full-stack web application for **AI-Solutions** — a premium UK-based artificial intelligence consultancy delivering enterprise-grade AI services across the United Kingdom.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, React Router DOM 7 |
| Backend | Node.js, Express 4 |
| Database | MongoDB via Mongoose 8 |
| Styling | Custom CSS (CSS Custom Properties) |

## Project Structure

```
full-stack-web-application100000/
├── index.html                  # Standalone vanilla SPA
├── backend/
│   ├── server.js               # Express API server
│   ├── seed.js                 # Standalone seed script (250 records)
│   ├── .env                    # Environment variables
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
└── frontend/
    ├── src/
    │   ├── App.jsx             # React Router setup
    │   ├── main.jsx            # Entry point
    │   ├── pages/              # Home, Services, Events, Gallery, Contact, Receipt, Tracker, Admin
    │   ├── components/         # Header
    │   ├── services/api.js     # Central API layer
    │   ├── hooks/useApi.js     # Generic API hook
    │   ├── data/index.js       # Static data (services, events, gallery)
    │   └── styles/global.css   # Design tokens & shared styles
    ├── vite.config.js          # Vite config with API proxy
    └── .env                    # Frontend env vars
```

## Features

- **9 AI Services** with detailed modals (description, features, pricing, timeline)
- **9 Events** with registration and unique booking references
- **Gallery** with masonry grid and full-screen lightbox
- **Contact form** with real-time validation and reference tracking
- **Enquiry tracker** with status timeline (New → In Progress → Pending → Closed)
- **Admin panel** with dashboard, enquiry management, CSV export, database seeding
- **AI Chatbot** (Aria) with Anthropic Claude API integration
- **PWA** support with offline caching
- **Responsive** design across all breakpoints

## Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0+
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Installation

### Backend

```bash
cd backend
npm install
```

Configure `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/ai_solutions
PORT=3000
```

Start the server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` with API requests proxied to the backend.

### Seed the Database

```bash
# Via API
curl -X POST http://localhost:3000/api/enquiries/seed

# Or run standalone script (250 records)
cd backend
node seed.js
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ai_solutions` |
| `PORT` | Server port | `3000` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |
| `VITE_ADMIN_USER` | Admin login username | `admin` |
| `VITE_ADMIN_PASS` | Admin login password | `admin123` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check (returns DB connection status) |
| `GET` | `/api/enquiries` | Get all enquiries (sorted newest first) |
| `GET` | `/api/enquiries/:ref` | Get single enquiry by reference |
| `POST` | `/api/enquiries` | Create new enquiry (auto-generates ref) |
| `PATCH` | `/api/enquiries/:ref/status` | Update enquiry status |
| `DELETE` | `/api/enquiries` | Delete all enquiries |
| `POST` | `/api/enquiries/seed` | Seed 20 demo records |

**Reference format**: `AIS-YYYY-NNN` (e.g., `AIS-2026-001`)

## Database Schema

```javascript
{
  ref:       { type: String, unique: true },     // AIS-YYYY-NNN
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true },
  company:   { type: String, required: true },
  country:   { type: String, required: true },
  jobtitle:  { type: String },
  interest:  { type: String, required: true },
  details:   { type: String },
  date:      { type: String },
  status:    { type: String, enum: ['New', 'In Progress', 'Pending', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
}
```

## Admin Panel

Access at `/admin`. Login with:

- **Username**: `admin`
- **Password**: `admin123`

### Sections

| Section | Features |
|---------|----------|
| Dashboard | KPIs, recent enquiries |
| Enquiries | Full table, status filter, inline status change, CSV export |
| Events | Events list with dates, locations, registration counts |
| Services | Services with pricing and enquiry counts |
| Database | Seed data, export CSV, reset all data, JSON preview |
| Settings | API endpoint info, version, logout |

## Deployment

| Component | Recommended Services |
|-----------|---------------------|
| Frontend | Netlify, Vercel, GitHub Pages |
| Backend | Railway, Render, Heroku |
| Database | MongoDB Atlas (free tier) |

For production, set `VITE_API_URL` in `frontend/.env` to your deployed backend URL (e.g., `https://your-api.onrender.com/api`).

## License

MIT
