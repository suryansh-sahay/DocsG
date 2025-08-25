# DocsG 🚀
> Real-time collaborative document editing — built with the MERN stack, Socket.io, JWT and Tailwind CSS.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/suryansh-sahay/DocsG)
[![Vercel](https://img.shields.io/badge/deploy-vercel-blue)](https://docs-f2ycmtavb-suryanshs-projects-22cdcd33.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

---

## 🔍 Overview
DocsG is a collaborative document editor inspired by Google Docs. Multiple users can edit the same document in real time using WebSockets (Socket.io). The project demonstrates secure authentication (JWT), email verification (Nodemailer), and a clean modular backend with RESTful APIs.

### 🌐 Live Demo:  👉 [DocsG on Vercel](https://docsg.vercel.app/)
---

## ✨ Features
- Real-time multi-user text editing (Socket.io)
- User authentication with JWT
- Email verification via Nodemailer
- CRUD for documents and user profiles
- Responsive UI using Tailwind CSS
- Clean REST API design and modular backend

---

## 🧰 Tech stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express, Socket.io  
- **Database:** MongoDB (Mongoose)  
- **Auth & Email:** JWT, Nodemailer  
- **Hosting / Deployment:** Vercel (frontend), Render (backend) 
- **Version Control:** GitHub

---

## 📁 Repo structure


---

## 🛠️ Quickstart (development)

### 1️⃣  Clone the repository
```bash
git clone https://github.com/suryansh-sahay/DocsG.git
cd DocsG
```
### 2️⃣ Backend Setup
```bash
cd Google-Docs-Backend
npm install
```
```bash
# Create a .env file in Google-Docs-Backend/ with the following content:
# ---------------------------------------------------------
# PORT=5000
# MONGO_URI=<your_mongodb_connection_string>
# JWT_SECRET=<strong_jwt_secret_here>
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=<your_email@mail.com>
# EMAIL_PASS=<app_password_or_smtp_password>
# FRONTEND_URL=http://localhost:3000
# ---------------------------------------------------------
```
```bash
# Start the backend server
npm run dev
```

### 3️⃣ Frontend Setup (open a new terminal in project root)
```bash
cd Google-Docs-Frontend
npm install
npm start
```
```bash
# Frontend runs on: http://localhost:3000
# Backend runs on:  http://localhost:3002
```
---

## 👤 Author  

**Suryansh Sahay** — B.Tech CSE, IIIT Vadodara  

- 🌐 [GitHub](https://github.com/suryansh-sahay)  
- 💼 [LinkedIn](https://www.linkedin.com/in/suryansh-sahay-2a426a27a/)  
- ✉️ [Email](mailto:suryanshsahay664@gmail.com)
---


