# Steve Amos Portfolio

A dynamic, full-stack portfolio platform built to showcase projects in software development and Graphics Design, with an integrated admin dashboard for managing content.

---

## 🔗 Live Demo
[View Live Site](https://steve-amos-portfolio.vercel.app/#)

---

## 📌 Overview

This portfolio is not just a static website. It is a full-stack system that allows projects to be added, edited, deleted, and featured dynamically through an admin dashboard.

It was built to move beyond traditional portfolios and demonstrate real-world system design, clean UI, and practical problem-solving.

---

## ⚙️ Features

- Dynamic project management (Add, Edit, Delete)
- Admin authentication (Supabase Auth)
- Featured projects on homepage
- Project detail pages with:
  - Problem
  - Role
  - Result
- Screenshot gallery with image preview (lightbox)
- Search and filter functionality
- Responsive design (mobile + desktop)
- Smooth animations using Framer Motion
- Image upload via Supabase Storage

---


## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion

### Backend (BaaS)
- Supabase (Database, Auth, Storage)

---

## 📂 Project Structure
src/
├── components/
├── pages/
├── services/
├── lib/
├── data/


---

## 🔐 Admin Access

Admin functionality is protected using Supabase authentication and Row Level Security (RLS).

Only authorized users can:
- Add projects
- Edit projects
- Delete projects
- Upload images

---

## 🧠 Key Concepts Demonstrated

- Full-stack integration using Supabase
- State management with React hooks
- Dynamic rendering of data-driven UI
- File uploads and storage handling
- Role-based access control (RLS)
- Component-based architecture
- Clean UI/UX design principles

---

## 📸 Screenshots

(Add your screenshots here later)

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dapsteveamos/steve-amos-portfolio.git
cd steve-amos-portfolio

2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
4. Run the project
npm run dev
