# Inventory & Billing Management System

A full-stack web application that helps small retailers manage inventory, generate bills, and track sales through a live analytics dashboard.

## Live Demo
- Frontend (Live App): https://inventory-billing-management-system-lyart.vercel.app/
- Backend (API): https://inventory-billing-management-system-i62l.onrender.com/api/health

## Problem Statement
Small retailers manage inventory manually, leading to stock mismatches, poor planning, and revenue loss.

## Objective
Develop a web-based system for inventory tracking, billing, and sales analytics.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL (Supabase)
- Charts: Chart.js
- Deployment: Vercel (frontend), Render (backend)
- Tools: GitHub, VS Code

## Features

### Product Management
- Add, edit, delete products
- Fetch and display all products

### Inventory System
- Tracks product stock quantity
- Auto-reduces stock when a bill is created
- Low stock alert when quantity falls below threshold

### Billing System
- Select products and quantity
- Auto-calculates total price
- Saves bill and bill items to database

### Dashboard
- Total products count
- Total sales amount
- Low stock item count
- Sales chart (Chart.js bar graph)

## Architecture

Frontend (React + Tailwind) -> REST API calls (Axios) -> Backend (Node.js + Express) -> Supabase client -> Database (PostgreSQL on Supabase)

## Folder Structure

inventory-billing-system/
- backend/
  - server.js
  - config/supabaseClient.js
  - controllers/productController.js
  - controllers/billController.js
  - routes/productRoutes.js
  - routes/billRoutes.js
- frontend/
  - src/api/
  - src/components/
  - src/pages/
  - src/App.jsx
  - src/main.jsx

## Database Schema

products table:
- id (uuid, primary key)
- name (text)
- price (numeric)
- quantity (integer)
- low_stock_threshold (integer)
- created_at (timestamp)

bills table:
- id (uuid, primary key)
- total_amount (numeric)
- created_at (timestamp)

bill_items table:
- id (uuid, primary key)
- bill_id (references bills)
- product_id (references products)
- quantity (integer)
- price (numeric)

## Setup Instructions (Run Locally)

### Prerequisites
- Node.js installed
- A Supabase account and project

### Backend Setup

cd backend
npm install

Create a .env file in backend/ with:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_api_key
PORT=5000

Run backend:
npm run dev

### Frontend Setup

cd frontend
npm install
npm run dev

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| POST | /api/products | Add a product |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |
| GET | /api/products/stats/dashboard | Get dashboard stats |
| POST | /api/bills | Create a bill |
| GET | /api/bills | Get all bills |

## Outcome and Impact
- Real-time inventory tracking
- Billing accuracy
- Revenue and sales analytics
- Low-stock alerts for smart restocking

## Author
Built as part of the LaunchED Web Development Capstone Project.
