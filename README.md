# SelfTrack

A full-stack freelance management app to track clients, jobs, expenses and invoices.
Built with Next.js, PostgreSQL and Clerk authentication.

---

## Features

- User authentication (Clerk)
- Manage clients and their associated jobs
- Track expenses linked to specific jobs
- Create and manage invoices
- Finance dashboard with categorized expenses and basic tax calculations (HMRC categories)
- Sort and filter data for better organization
- User-specific data isolation and security
- Clean and responsive UI

---

## Tech Stack

- Next.js (App Router)
- React
- PostgreSQL (pg)
- Clerk Authentication
- Tailwind CSS + custom CSS
- Vercel (deployment)

---

## Project Structure

- `/app` → pages and routing (App Router)
- `/components` → reusable UI components and forms
- `/utils` → helper functions and database connection
- `/actions` → server actions (CRUD operations)

---

## Setup

1. Clone the repository
2. Install dependencies: npm install
3. Set environment variables
   - Clerk keys
   - Database connection
4. Run locally: npm run dev

---

## What I learned

- Building a full-stack app with Next.js App Router
- Working with relational databases (PostgreSQL)
- Implementing authentication and user-based data
- Managing complex state and data flow
- Structuring a scalable project

---

## Future Improvements

- Calendar / scheduling integration
- Advanced financial reporting and analytics
- Automation features (AI agents)
- Refactor and unify styling by improving consistency between Tailwind CSS and custom CSS

---

## Live Demo

https://self-employment-tracker-hazel.vercel.app/
