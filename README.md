# Inventory & Billing Management System

A full-stack web application that helps small retailers manage inventory, generate bills, and track sales through a live analytics dashboard.

## Problem Statement
Small retailers manage inventory manually, leading to stock mismatches, poor planning, and revenue loss.

## Objective
Develop a web-based system for inventory tracking, billing, and sales analytics.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Supabase)
- **Charts:** Chart.js
- **Tools:** GitHub, VS Code

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