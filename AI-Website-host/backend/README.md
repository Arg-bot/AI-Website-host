# AI-Solutions Web Application

A comprehensive full-stack web application for AI-Solutions, a premier artificial intelligence consultancy based in Sunderland, United Kingdom.

## Features

- **Responsive Website**: Fully responsive design for mobile, tablet, and desktop
- **9 AI Services**: Detailed service pages with pricing and use cases
- **Events System**: Event listings with registration functionality
- **Event Gallery**: Photo gallery with lightbox functionality
- **Contact/Enquiry System**: Full-featured enquiry form with validation
- **Enquiry Tracking**: Reference-based status tracking
- **Admin Dashboard**: Comprehensive admin panel with analytics
- **AI Chatbot (Aria)**: Intelligent assistant powered by Claude API
- **PWA Support**: Installable as a progressive web app

## Architecture

```
Frontend (index.html)
    |
    v
REST API (server.js)
    |
    v
MongoDB (Atlas or Local)
```

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Fonts**: Google Fonts (Syne, DM Sans)

## Prerequisites

- Node.js v18.0.0 or higher
- npm (comes with Node.js)
- MongoDB Atlas account (free tier) OR local MongoDB installation

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-solutions-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account
2. Create a new cluster (free M0 tier is sufficient)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<username>` and `<password>` with your database user credentials

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/ai_solutions?retryWrites=true&w=majority
PORT=3001
```

### 5. Start the Backend Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on http://localhost:3001

### 6. Open the Frontend

Open `index.html` in your web browser, or serve it using a local server:

```bash
# Using Python
python -m http.server 8080

# Using npx
npx serve .
```

Then visit http://localhost:8080 (or the port shown)

## Admin Panel

Access the admin panel at the `/admin` route (click "Admin" in the footer navigation).

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

### Admin Features

- Dashboard with KPIs and charts
- Enquiry management with status updates
- Reports and analytics
- Events management view
- Services overview
- Database operations (seed, export, reset)
- Settings and logout

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/enquiries` | Get all enquiries |
| POST | `/api/enquiries` | Create new enquiry |
| GET | `/api/enquiries/:ref` | Get single enquiry |
| PATCH | `/api/enquiries/:ref/status` | Update enquiry status |
| DELETE | `/api/enquiries` | Delete all enquiries |
| POST | `/api/enquiries/seed` | Seed 20 demo records |

### Example API Calls

```bash
# Health check
curl http://localhost:3001/api/health

# Get all enquiries
curl http://localhost:3001/api/enquiries

# Create enquiry
curl -X POST http://localhost:3001/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+44 1234 567890","company":"Test Corp","country":"United Kingdom","interest":"General Enquiry"}'

# Update status
curl -X PATCH http://localhost:3001/api/enquiries/AIS-2025-001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"In Progress"}'

# Seed database
curl -X POST http://localhost:3001/api/enquiries/seed

# Reset database
curl -X DELETE http://localhost:3001/api/enquiries
```

## Deployment

### Frontend Deployment

The `index.html` file is a static file that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

### Backend Deployment

Deploy `server.js` to:
- Railway
- Render
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform

### MongoDB Atlas Production

For production, ensure:
1. Use a dedicated cluster (M10+)
2. Enable IP whitelist
3. Use environment variables for secrets
4. Enable backup

## Project Structure

```
ai-solutions-website/
|-- index.html          # Complete frontend application
|-- server.js           # Express backend server
|-- package.json        # Node.js dependencies
|-- .env.example       # Environment template
|-- README.md           # This file
|-- manifest.json       # PWA manifest (create separately)
|-- sw.js               # Service worker (create separately)
```

## PWA Setup

Create `manifest.json`:

```json
{
  "name": "AI-Solutions",
  "short_name": "AI-Solutions",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#042C53",
  "background_color": "#042C53",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Create `sw.js` (Service Worker):

```javascript
const CACHE_NAME = 'ai-solutions-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
```

## AI Chatbot (Aria)

The chatbot uses Anthropic's Claude API. To enable it:

1. Sign up at [Anthropic](https://anthropic.com)
2. Get your API key
3. Update the `chatInput` function in `index.html` with your key:

```javascript
'x-api-key': 'your-anthropic-api-key'
```

Note: The chatbot has a fallback mode that works without an API key.

## Customisation

### colours

Edit the CSS custom properties in the `:root` selector:

```css
:root {
  --navy: #042C53;
  --blue: #185FA5;
  --teal: #1D9E75;
  --green: #639922;
  /* ... */
}
```

### Services

Edit the `services` array in the JavaScript section of `index.html`.

### Events

Edit the `events` array in the JavaScript section of `index.html`.

## Troubleshooting

### MongoDB Connection Issues

1. Check your internet connection
2. Verify MongoDB Atlas IP whitelist includes your IP
3. Ensure credentials are correct in `.env`
4. Check cluster status in Atlas dashboard

### CORS Errors

The server is configured to allow all origins. If issues persist:
- Clear browser cache
- Check browser console for specific errors
- Verify no VPN is blocking requests

### API Not Responding

1. Ensure the backend server is running (`npm run dev`)
2. Check the terminal for error messages
3. Verify the port is not in use

## License

MIT License - See LICENSE file for details.

## Support

For support, contact:
- Email: info@ai-solutions.co.uk
- Phone: +44 191 000 0000
- Address: 10 Innovation Quarter, Sunderland SR1 1AA, United Kingdom

---

Built with care by AI-Solutions
