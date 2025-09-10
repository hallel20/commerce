# Commerce Web Application

A full-stack e-commerce platform built with a modern React frontend and a Node.js/Express backend, featuring robust authentication, product management, and order processing. This project is organized into two main folders: `client` (frontend) and `server` (backend).

---

## Features

### Frontend (Client)
- **Modern UI**: Built with React, Vite, and Tailwind CSS for a fast and responsive user experience.
- **Authentication**: Signup, login, and protected routes for users, staff, and admins.
- **Product Catalog**: Browse, search, and filter products with detailed product cards.
- **Cart & Wishlist**: Add/remove products to cart and wishlist, with persistent state.
- **Order Management**: Place orders, view order history, and manage invoices.
- **Account Management**: User profile, account settings, and order tracking.
- **Admin Dashboard**: Admin interface for managing products, categories, orders, and users.
- **Staff Dashboard**: Staff interface for order processing and inventory management.
- **Reusable Components**: Modular components for layout, modals, spinners, charts, and more.
- **Responsive Design**: Mobile-friendly layouts and navigation.
- **Custom Hooks & Context**: State management using React Context and custom hooks (e.g., CartContext).
- **API Integration**: Axios-based API layer for seamless communication with the backend.
- **Error Handling**: Custom error pages (e.g., 403 Forbidden) and loading states.

### Backend (Server)
- **Node.js & Express**: RESTful API for all commerce operations.
- **Prisma ORM**: Database access and migrations using Prisma.
- **Authentication & Authorization**: Middleware for user, staff, and admin roles.
- **Product & Category Management**: CRUD operations for products and categories.
- **Order & Cart Management**: Endpoints for managing orders, order items, carts, and cart items.
- **Wishlist Management**: Endpoints for user wishlists and wishlist items.
- **User Management**: Account creation, login, and profile management.
- **File Uploads**: Image upload support for products and user avatars.
- **Seeding & Migrations**: Seed scripts and migration management for database setup.

---

## Planned / Future Features
- **Payment Integration**: Add support for payment gateways (e.g., Stripe, PayPal).
- **Product Reviews & Ratings**: Allow users to review and rate products.
- **Notifications**: Email and in-app notifications for order updates and promotions.
- **Analytics Dashboard**: Advanced analytics for admins and staff.
- **Multi-language Support**: Internationalization (i18n) for global users.
- **Inventory Alerts**: Low-stock notifications and automated restocking.
- **Discounts & Coupons**: Support for promotional codes and discounts.
- **User Roles & Permissions**: More granular role management and permissions.
- **Progressive Web App (PWA)**: Offline support and installable web app.
- **Third-party Integrations**: Integrate with shipping providers and marketing tools.

---

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/hallel20/commerce.git
   cd commerce
   ```
2. **Install dependencies**
   - For the frontend:
     ```sh
     cd client
     npm install
     ```
   - For the backend:
     ```sh
     cd ../server
     npm install
     ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `client` and `server` folders and update as needed.
4. **Run the development servers**
   - Frontend:
     ```sh
     npm run dev
     ```
   - Backend:
     ```sh
     npm run dev
     ```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
