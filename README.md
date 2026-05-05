# FoodHub Frontend 🍽️

A premium, artisanal web application for food discovery and ordering. FoodHub connects culinary enthusiasts with local providers through a state-of-the-art, responsive interface.

## ✨ Premium Features

- **Artisanal Design**: A warm, high-end aesthetic built with the "Artisan" theme (`#FFFCF7` and `#F3BC58`).
- **Triple-Role Dashboards**:
  - **User**: Order history, live tracking, and profile management.
  - **Provider**: Product management (Add/Update/Delete), order processing, and restaurant profiling.
  - **Admin**: Global platform statistics, user management, and order monitoring.
- **Dynamic Cart System**: Seamless cart management with persistent local state.
- **Robust Searching**: Filter meals by category or search by keywords with instant results.
- **Provider Identity**: Dedicated public profiles for restaurants showcasing their unique menu and story.

## 🚀 Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API (Cart) & Custom Hooks (Auth)
- **UI Components**: Shadcn/UI & Lucide React
- **Notifications**: React Hot Toast
- **API Client**: Axios with interceptors

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

- `src/app`: Next.js App Router pages and layouts.
- `src/components`:
  - `modules`: Feature-specific components (Forms, Dashboard modules).
  - `shared`: Reusable global components (Navbar, Footer, MealCard).
  - `ui`: Base UI components (Shadcn).
- `src/context`: Global state providers.
- `src/hooks`: Custom React hooks for Auth and utility.
- `service/`: API endpoint definitions and service layer.

## 🎨 Design System

FoodHub uses a curated color palette to evoke warmth and quality:
- **Primary**: `#F3BC58` (Golden Harvest)
- **Hover**: `#D9901C` (Deep Honey)
- **Background**: `#FFFCF7` (Creamy Parchment)
- **Dark Elements**: `#111827` (Rich Obsidian)

---
Developed by **[Abdullah Al Mamun](https://github.com/mamun-jsx)**
