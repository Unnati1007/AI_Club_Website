# AI Club Website

A modern, responsive, full-stack web application for the AI Club, built using React, Vite, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB. The site features a 3D interactive hero section (Spline), smooth scrolling, dynamic animations, and an admin dashboard for managing club events, team members, and activities.

## Live Links

- **Frontend:** [https://aiclubmits.site](https://aiclubmits.site)
- **Backend API:** [https://ai-club-website-71x4.vercel.app](https://ai-club-website-71x4.vercel.app)

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion
- **UI Components**: shadcn/ui (Radix UI)
- **3D Graphics**: Spline Tool
- **Animations**: GSAP, Framer Motion, Lenis (for smooth scrolling)

### Backend
- **Framework**: Node.js & Express.js (ES Modules)
- **Authentication**: JWT (JSON Web Tokens) & `bcryptjs` password hashing
- **Database**: MongoDB (Mongoose ODM)
- **Environment Variables**: dotenv
- **CORS**: cors
- **File Uploads**: multer

## Project Structure

The project follows a full-stack monorepo-style structure:

```text
AI_Club_Website/
├── backend/               # Express.js REST API & MongoDB models
│   ├── models/            # Mongoose schemas (Event, TeamMember, GD, etc.)
│   ├── package.json       # Backend dependencies
│   ├── seed.js            # Database seeding script
│   ├── server.js          # Main Express server and API routes
│   └── vercel.json        # Vercel serverless deployment config
│
├── src/                   # React Frontend
│   ├── components/        # UI and layout components
│   │   ├── sections/      # Modular homepage sections (Hero, About, Events, etc.)
│   │   └── ui/            # Reusable shadcn/ui components
│   ├── hooks/             # Custom React hooks (useCMSData, useGDStore)
│   ├── pages/             # Page components (Index, Admin Dashboard)
│   ├── App.tsx            # Application root
│   └── main.tsx           # React entry point
│
├── package.json           # Frontend dependencies
└── vite.config.ts         # Vite configuration with proxy for local development
```

## Key Features

- **Dynamic 3D Hero**: Uses Spline for an interactive 3D robot scene.
- **JWT-Protected Admin Dashboard**: A secure route (`/admin`) for administrators to manage website content (both **Events** and **GDs**) dynamically via a unified tabbed interface in real-time. Write operations (`POST`, `PUT`, `DELETE`) require a valid JWT token signed on the backend.
- **Mobile Responsive**: Fully fluid design that adapts seamlessly to desktop, tablet, and mobile screens.
- **Premium Aesthetics**: Glassmorphism, smooth gradients, hover effects, and modern typography.

## Getting Started Locally

### Prerequisites
Make sure you have Node.js installed, and a MongoDB Atlas cluster (or local MongoDB) running.

### 1. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_signing_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```
Run the seed script to populate the database with a hashed admin account and sample data:
```bash
node seed.js
```
Start the backend server:
```bash
npm run dev
```

### 2. Setup Frontend
Open a new terminal window:
```bash
# From the root AI_Club_Website directory
npm install
```
Create a `.env` file in the root folder:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```
Start the frontend Vite server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:8081` (or whichever port Vite spawns). The Vite proxy automatically routes `/api` requests to `http://localhost:5001`.

## Deployment

### Backend Deployment (Vercel)
The backend is configured for Vercel using the `vercel.json` file. It exports the Express app as a serverless function. 
*   **Environment Variables needed in Vercel:** `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`

### Frontend Deployment (Vercel)
Deploy the root folder to Vercel. 
*   **Environment Variables needed in Vercel:** `VITE_API_URL` (Set this to the deployed backend URL, e.g., `https://ai-club-website-71x4.vercel.app`)

## Credits

- **Developed & Led by:** Unnati Jadon


