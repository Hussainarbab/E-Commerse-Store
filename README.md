# LuxeCart Ecommerce Platform

A modern full-stack ecommerce application with a polished storefront, authentication, and an advanced admin dashboard.

## Stack
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- Auth: JWT, HTTP-only cookies, bcrypt
- Email: Nodemailer
- File Upload: Cloudinary
- Deployment: Vercel + Render + MongoDB Atlas

## Structure
- /client
- /server

## Setup
1. Install dependencies in both folders.
2. Copy server/.env.example to server/.env and configure values.
3. Start the backend and frontend.

## Scripts
- Client: npm run dev
- Server: npm run dev

## Notes
- The server includes authentication, product/category/order/user management, admin routes, and seeded architecture for future expansion.
- Replace placeholder form logic with real API integration when connecting to a live backend.
