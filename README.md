# FoodHub Frontend 🍽️

A premium, artisanal web application for food discovery and ordering. FoodHub connects culinary enthusiasts with local providers through a state-of-the-art, high-performance interface.

## 🔗 Quick Links

- **Live Site**: [https://food-hub-frontend-tan.vercel.app](https://food-hub-frontend-tan.vercel.app)
- **Backend Code Repo**: [https://github.com/mamun-jsx/food-hub-backend-pg-ts](https://github.com/mamun-jsx/food-hub-backend-pg-ts)
- **Backend API Live**: [https://food-hub-backend-pg-ts.vercel.app](https://food-hub-backend-pg-ts.vercel.app)

## ✨ Advanced Features

- **SSR & Performance (React 19)**: Leverages Server-Side Rendering (SSR) and streaming with React 19's latest patterns for lightning-fast initial loads and SEO optimization.
- **Optimistic UI**: Experience instant feedback with `useOptimistic` for review submissions and cart interactions, providing a professional and fluid feel.
- **Verified Review System**: A secure review flow where only customers with confirmed, delivered orders can leave feedback via their personalized dashboard.
- **Artisanal Design System**: A warm, high-end aesthetic built with custom color tokens and premium skeleton loaders for a smooth perceived performance.
- **Triple-Role Dashboards**:
  - **User**: Manage profile, track order history, and leave verified reviews.
  - **Provider**: Professional tools for menu management, business profiling, and real-time order status updates.
  - **Admin**: Comprehensive platform oversight with global stats and user management.
- **Smart Filtering & Searching**: Sophisticated meal discovery with category-based filtering, advanced sorting (Price, Name, Date), and debounced search.

## 🚀 Technologies

- **Framework**: [Next.js 16 (Canary)](https://nextjs.org/) (App Router & Server Components)
- **Library**: [React 19](https://react.dev/)
- **State Management**: TanStack Query v5 (Suspense Integration) & Context API
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Shadcn/UI & Lucide React
- **Notifications**: React Hot Toast
- **API Client**: Axios with interceptors for JWT handling

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- Pnpm (recommended) or Npm

### 2. Installation
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"
```

### 4. Running the Application
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

- `src/app`: Next.js App Router with specialized layouts for Auth and Dashboard.
- `src/components`: 
  - `modules`: Feature-rich components (Home sections, Dashboard modules).
  - `shared`: Global reusable components (Navbar, Skeleton Grids, MealCards).
- `service/`: Modular API service layer organized by domain (Auth, Provider, User).
- `src/context`: Global state management for Cart and Theme.

---
Developed with ❤️ by **[Abdullah Al Mamun](https://github.com/mamun-jsx)**
