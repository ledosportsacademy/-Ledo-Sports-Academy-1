# Ledo Sports Academy Management System

## Overview
This is a management system for Ledo Sports Academy that includes features for managing hero slides, activities, members, donations, expenses, experiences, and weekly fees. The application integrates with MongoDB for data persistence and can be deployed to Render.

## Features
- Hero slideshow management
- Activities tracking
- Member management
- Donation tracking
- Expense management
- Experience logging
- Weekly fees tracking
- Dashboard with metrics
- Gallery management
- MongoDB integration
- Render deployment support

## MongoDB Integration
The application now uses MongoDB to store all data. The MongoDB connection is configured using environment variables in a `.env` file.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Deployment to Render

### Option 1: Using the Render Dashboard

1. Create a new account or log in to your existing account on [Render](https://render.com/)
2. Click on the "New +" button and select "Web Service"
3. Connect your GitHub repository or upload your code directly
4. Configure the following settings:
   - Name: `ledo-sports-academy` (or any name you prefer)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: `10000` (or any port Render assigns)
6. Click "Create Web Service"

### Option 2: Using render.yaml (Blueprint)

1. Push your code to a GitHub repository, including the `render.yaml` file
2. Log in to your Render account
3. Go to the "Blueprints" section
4. Click on "New Blueprint Instance"
5. Connect to your GitHub repository
6. Render will automatically detect the `render.yaml` file and configure the services
7. Add your `MONGODB_URI` environment variable when prompted
8. Deploy the blueprint

### Important Notes for Deployment

- Make sure your MongoDB Atlas cluster is configured to accept connections from any IP address (0.0.0.0/0) or specifically from Render's IP ranges
- The free tier of Render may have some limitations in terms of performance and uptime
- Your application will be accessible at a URL like `https://ledo-sports-academy.onrender.com`

## Data Structure
The application uses the following MongoDB collections:
- HeroSlides
- Activities
- Members
- Donations
- Expenses
- Experiences
- WeeklyFees

## API Endpoints

### Hero Slides
- GET `/api/hero-slides` - Get all hero slides
- POST `/api/hero-slides` - Create a new hero slide
- PUT `/api/hero-slides/:id` - Update a hero slide
- DELETE `/api/hero-slides/:id` - Delete a hero slide

### Activities
- GET `/api/activities` - Get all activities
- POST `/api/activities` - Create a new activity
- PUT `/api/activities/:id` - Update an activity
- DELETE `/api/activities/:id` - Delete an activity

### Members
- GET `/api/members` - Get all members

### Donations
- GET `/api/donations` - Get all donations

### Expenses
- GET `/api/expenses` - Get all expenses

### Experiences
- GET `/api/experiences` - Get all experiences

### Weekly Fees
- GET `/api/weekly-fees` - Get all weekly fees

## Initial Data
When the application starts for the first time, it will check if there is any data in the MongoDB database. If no data is found, it will initialize the database with the default data from the application.

## Error Handling
If the application fails to connect to the MongoDB database, it will fall back to using the local data defined in the `app.js` file.