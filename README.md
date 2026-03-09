# AI Club Website

A modern, responsive web application for an AI Club, built using React, Vite, TypeScript, and Tailwind CSS. The site features smooth scrolling, dynamic animations, and an admin dashboard for managing club sessions and activities.

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router DOM
- **Animations**: GSAP, Framer Motion, Lenis (for smooth scrolling)
- **State Management**: React Query, Custom Hooks (e.g., `useGDStore` with LocalStorage)

## Project Structure

The project follows a modular and clean architecture:

```text
src/
├── components/
│   ├── layout/       # Global layout components like Navbar
│   ├── providers/    # Context providers (e.g., LenisProvider for smooth scrolling)
│   ├── sections/     # Modular homepage sections (Hero, About, Events, Team, etc.)
│   └── ui/           # Reusable UI components from shadcn/ui
├── hooks/            # Custom React hooks (e.g., useGDStore for local storage management)
├── lib/              # Utility functions (e.g., Tailwind class merger utils.ts)
├── pages/            # Page components for React Router
│   ├── Index.tsx           # Main landing page
│   ├── AdminLogin.tsx      # Admin authentication page
│   ├── AdminDashboard.tsx  # Dashboard for managing GDs (Group Discussions)
│   └── NotFound.tsx        # 404 Error page
├── App.tsx           # Application root and router configuration
├── main.tsx          # React entry point
└── index.css         # Global stylesheets and Tailwind directives
```

## Key Features

- **Landing Page**: A comprehensive, animated single-page experience highlighting the club's hero section, about details, events, team members, and contributors.
- **Admin Dashboard**: A protected route for administrators to manage Group Discussions (GD Items). It uses a local storage-based store (`useGDStore`) to add, update, and delete sessions without requiring a backend.
- **Smooth Scrolling**: Implemented using Lenis for a premium user experience.
- **Component Library**: Integrates beautifully designed, accessible components from shadcn/ui.

## Getting Started

### Prerequisites
Make sure you have Node.js and a package manager like `npm` or `bun` installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd AI_Club_Website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### Building for Production
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run lint` - Runs ESLint to check for code quality issues.
- `npm run preview` - Previews the production build locally.
- `npm run test` - Runs the Vitest test suite.
