# 🍽️ Food Hub Frontend (Next.js)

This is the frontend of the **Food Hub Multi-Vendor System**, built with Next.js App Router. It provides a responsive UI for customers, providers, and admins to interact with the food ordering platform.

The application supports role-based dashboards, dynamic routing, API proxying, and a modern UI built using ShadCN components.

---

## 🚀 Features

This frontend allows users to browse food items, filter by category, view provider-specific menus, and place orders.

It supports three different roles:

- 👤 Customer: Browse meals, place orders, leave reviews after delivery
- 🏪 Provider: Manage meals, view orders, handle customer requests
- 🛠️ Admin: Manage users, assign provider roles, and control the system

The UI is fully responsive and optimized for mobile, tablet, and desktop devices.

---

## 🧭 Dashboard System

The application uses role-based dashboard routing:

- `/dashboard/admin` → Admin dashboard layout
- `/dashboard/provider` → Provider dashboard layout
- `/dashboard/customer` → Customer dashboard layout

All dashboards share a common layout system with role-specific UI components and navigation.

---

## 🎨 UI & Styling

- Built with **ShadCN UI components**
- Fully responsive design using Tailwind CSS
- Clean and modern dashboard UI
- Reusable component system

---

## 🔌 API Proxy System

The frontend communicates with the backend using a proxy setup to handle API requests securely.

Example:Environment variable:
```env id="proxy-env"
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000


git clone https://github.com/mamun-jsx/food-hub-frontend.git
cd food-hub-frontend 
pnpm install
pnpm dev





- Backend must be running before frontend
- Ensure `.env` is configured correctly
- All API calls depend on backend URL proxy
