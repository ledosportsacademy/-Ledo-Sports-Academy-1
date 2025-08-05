const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log the port for debugging during deployment
console.log('Server will run on port:', PORT);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// API Routes - Define these before the catch-all route

// Define API routes here (they will be moved below)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define schemas and models
const heroSlideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  backgroundImage: String,
  ctaText: String,
  ctaLink: String,
  redirectUrl: String,
  openNewTab: Boolean
});

const activitySchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  description: String,
  image: String,
  status: String,
  type: String,
  priority: String,
  redirectUrl: String,
  openNewTab: Boolean
});

const memberSchema = new mongoose.Schema({
  name: String,
  contact: String,
  phone: String,
  joinDate: String,
  role: String,
  image: String
});

const donationSchema = new mongoose.Schema({
  donor: String,
  amount: Number,
  date: String,
  purpose: String,
  status: String
});

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: String,
  category: String,
  description: String
});

const experienceSchema = new mongoose.Schema({
  title: String,
  date: String,
  author: String,
  content: String,
  image: String
});

const weeklyFeeSchema = new mongoose.Schema({
  memberName: String,
  amount: Number,
  dueDate: String,
  status: String
});

// Create models
const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Member = mongoose.model('Member', memberSchema);
const Donation = mongoose.model('Donation', donationSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const WeeklyFee = mongoose.model('WeeklyFee', weeklyFeeSchema);



// API Routes

// Get all hero slides
app.get('/api/hero-slides', async (req, res) => {
  try {
    const slides = await HeroSlide.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new hero slide
app.post('/api/hero-slides', async (req, res) => {
  const slide = new HeroSlide(req.body);
  try {
    const newSlide = await slide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a hero slide
app.put('/api/hero-slides/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a hero slide
app.delete('/api/hero-slides/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new activity
app.post('/api/activities', async (req, res) => {
  const activity = new Activity(req.body);
  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an activity
app.put('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an activity
app.delete('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new member
app.post('/api/members', async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member
app.put('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a member
app.delete('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all experiences
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all weekly fees
app.get('/api/weekly-fees', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    res.json(weeklyFees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new weekly fee
app.post('/api/weekly-fees', async (req, res) => {
  const weeklyFee = new WeeklyFee(req.body);
  try {
    const newWeeklyFee = await weeklyFee.save();
    res.status(201).json(newWeeklyFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a weekly fee
app.put('/api/weekly-fees/:id', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee not found' });
    res.json(weeklyFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a weekly fee
app.delete('/api/weekly-fees/:id', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findByIdAndDelete(req.params.id);
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee not found' });
    res.json({ message: 'Weekly fee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static files for the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route to serve the main HTML file for client-side routing
app.get('*', (req, res) => {
  // Exclude API routes from this catch-all
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});