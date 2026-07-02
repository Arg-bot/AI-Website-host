const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_solutions';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const enquirySchema = new mongoose.Schema({
  ref: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  jobtitle: String,
  interest: { type: String, required: true },
  details: String,
  date: String,
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Pending', 'Closed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

// Generate reference number
async function generateRef() {
  const year = new Date().getFullYear();
  const count = await mongoose.model('Enquiry').countDocuments() + 1;
  return `AIS-${year}-${String(count).padStart(3, '0')}`;
}

// Model
const Enquiry = mongoose.model('Enquiry', enquirySchema);

// ─── Quotation Schema ─────────────────────────────────────────────────────────
const quotationSchema = new mongoose.Schema({
  ref: { type: String, unique: true },
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: { type: String, required: true },
  message: String,
  status: {
    type: String,
    enum: ['New', 'Reviewing', 'Quote Sent', 'Accepted', 'Rejected'],
    default: 'New'
  },
  createdAt: { type: Date, default: Date.now }
});

async function generateQuoteRef() {
  const year = new Date().getFullYear();
  const count = await mongoose.model('Quotation').countDocuments() + 1;
  return `QT-${year}-${String(count).padStart(3, '0')}`;
}

const Quotation = mongoose.model('Quotation', quotationSchema);

// ─── Feedback Schema ──────────────────────────────────────────────────────────
const feedbackSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Seed data generator
function generateSeedData() {
  const firstNames = ['James', 'Emma', 'Oliver', 'Sophia', 'William', 'Isabella', 'Harry', 'Olivia', 'George', 'Ava', 'Noah', 'Mia', 'Jack', 'Emily', 'Amelia', 'Charlie', 'Harper', 'Jacob', 'Ella', 'Thomas'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];
  const companies = ['TechCorp UK', 'Norditek Logistics', 'HealthFirst NHS Trust', 'Meridian Financial', 'Apex Manufacturing', 'Global Retail Ltd', 'CityBank plc', 'Metro Healthcare', 'Summit Digital', 'Coastal Energy', 'Pinnacle Insurance', 'Alpha Healthcare', 'Bright Futures Ltd', 'Delta Engineering', 'Echo Systems', 'Frontier Tech', 'Grandview Capital', 'Horizon Media', 'Infinity Solutions', 'Jupiter Partners'];
  const countries = ['United Kingdom', 'United States', 'Germany', 'France', 'Netherlands', 'Sweden', 'Canada', 'Australia', 'Ireland', 'Spain'];
  const interests = ['AI Virtual Assistant', 'Schedule a Personalised Demo', 'Rapid Prototyping', 'Data Analytics', 'Join an Event', 'General Enquiry', 'Cloud Architecture', 'Cybersecurity AI', 'Intelligent Automation'];
  const statuses = ['New', 'In Progress', 'Pending', 'Closed'];
  const jobTitles = ['CEO', 'CTO', 'CISO', 'Operations Director', 'Head of Digital', 'IT Manager', 'Data Scientist', 'Solutions Architect', 'Product Manager', 'Innovation Lead'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdDate = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000);
    
    return {
      ref: `AIS-${createdDate.getFullYear()}-${String(i + 1).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+44 ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 900000 + 100000)}`,
      company: company,
      country: countries[Math.floor(Math.random() * countries.length)],
      jobtitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      interest: interests[Math.floor(Math.random() * interests.length)],
      details: 'This is a sample enquiry generated for demonstration purposes.',
      date: createdDate.toISOString(),
      status: status,
      createdAt: createdDate
    };
  });
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Get all enquiries
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// Get single enquiry by reference
app.get('/api/enquiries/:ref', async (req, res) => {
  try {
    const enquiry = await Enquiry.findOne({ ref: req.params.ref });
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({ error: 'Failed to fetch enquiry' });
  }
});

// Create new enquiry
app.post('/api/enquiries', async (req, res) => {
  try {
    const ref = await generateRef();
    const enquiry = new Enquiry({
      ...req.body,
      ref,
      createdAt: new Date()
    });
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Failed to create enquiry' });
  }
});

// Update enquiry status
app.patch('/api/enquiries/:ref/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['New', 'In Progress', 'Pending', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const enquiry = await Enquiry.findOneAndUpdate(
      { ref: req.params.ref },
      { status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    
    res.json(enquiry);
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// Delete all enquiries
app.delete('/api/enquiries', async (req, res) => {
  try {
    await Enquiry.deleteMany({});
    res.json({ message: 'All enquiries deleted', count: 0 });
  } catch (error) {
    console.error('Error deleting enquiries:', error);
    res.status(500).json({ error: 'Failed to delete enquiries' });
  }
});

// Seed database with dummy data
app.post('/api/enquiries/seed', async (req, res) => {
  try {
    const seedData = generateSeedData();
    const result = await Enquiry.bulkWrite(
      seedData.map(doc => ({
        updateOne: {
          filter: { ref: doc.ref },
          update: { $setOnInsert: doc },
          upsert: true
        }
      })),
      { ordered: false }
    );
    const count = await Enquiry.countDocuments();
    res.json({ 
      message: 'Database seeded successfully', 
      count,
      inserted: result.upsertedCount
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

// ─── Quotation Routes ─────────────────────────────────────────────────────────

// Get all quotations
app.get('/api/quotations', async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
});

// Get single quotation by ref
app.get('/api/quotations/:ref', async (req, res) => {
  try {
    const quotation = await Quotation.findOne({ ref: req.params.ref });
    if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({ error: 'Failed to fetch quotation' });
  }
});

// Create new quotation
app.post('/api/quotations', async (req, res) => {
  try {
    const ref = await generateQuoteRef();
    const quotation = new Quotation({ ...req.body, ref, createdAt: new Date() });
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    console.error('Error creating quotation:', error);
    res.status(500).json({ error: 'Failed to create quotation' });
  }
});

// Update quotation status
app.patch('/api/quotations/:ref/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['New', 'Reviewing', 'Quote Sent', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const quotation = await Quotation.findOneAndUpdate(
      { ref: req.params.ref },
      { status },
      { new: true }
    );
    if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({ error: 'Failed to update quotation' });
  }
});

// Delete all quotations
app.delete('/api/quotations', async (req, res) => {
  try {
    await Quotation.deleteMany({});
    res.json({ message: 'All quotations deleted', count: 0 });
  } catch (error) {
    console.error('Error deleting quotations:', error);
    res.status(500).json({ error: 'Failed to delete quotations' });
  }
});

// ─── Feedback Routes ──────────────────────────────────────────────────────────

// Get all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Get feedback for a specific service
app.get('/api/feedback/service/:serviceId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ serviceId: req.params.serviceId }).sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching service feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Create new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback({ ...req.body, createdAt: new Date() });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// Update feedback status
app.patch('/api/feedback/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

// Delete all feedback
app.delete('/api/feedback', async (req, res) => {
  try {
    await Feedback.deleteMany({});
    res.json({ message: 'All feedback deleted', count: 0 });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

// ─── Email Route ─────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/email/send', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ error: 'To, subject, and message are required' });
    }

    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'AI Solutions'}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`AI-Solutions API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;