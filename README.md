# 📌 Backend Complete Project - Watchlist

This repository contains my implementation of a **complete backend application** built while following a course covering:

- Node.js  
- Express.js  
- JWT Authentication  
- PostgreSQL  
- Prisma ORM  

---

## 🚀 Project Purpose

The goal of this project is **not only to replicate the course content**, but also to **evolve it over time**.

- ✅ The **first commit** represents the final state of the project as built during the course  
- 🔄 All subsequent commits include **my own improvements, refactors, and new features** based on continued learning  

---

## 🧠 What I’m Practicing

This project is being used as a playground to improve skills in:

- Backend architecture and organization  
- Authentication & authorization (JWT)  
- Database modeling and relationships  
- API design (RESTful principles)  
- Clean code & best practices  
- Error handling and validation  
- Scalability and maintainability  

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (Authentication)
- Neon (Serverless Postgres)

---

## 🗄 Database

This project uses **PostgreSQL hosted on Neon**, which provides:

- ⚡ Serverless Postgres (no infrastructure management)  
- 🌱 Database branching for development/testing  
- 🚀 Fast provisioning and scaling  
- 🔒 Secure connections with SSL by default  

Prisma is used as the ORM to interact with the database.

---

## 📂 Project Structure (high level)

```
src/
├── controllers/     # Route handlers
├── routes/          # API routes
├── middleware/      # Auth, validation, etc.
├── services/        # Business logic (improvements)
├── prisma/          # Database schema & migrations
```

---

## 🔐 Features

- User authentication with JWT  
- CRUD operations  
- Relational database with Prisma  
- Protected routes  
- Input validation  
- Error handling  

---

## 🔄 Ongoing Improvements

Some of the improvements I plan (or already started):

- [X] Refactor to service layer architecture
- [X] Add Dependency Injection
- [X] Add more request validation (Zod)  
- [ ] Improve error handling (centralized middleware)  
- [ ] Add logging  
- [ ] Add tests (unit/integration)  
- [ ] Dockerize the application  
- [ ] CI/CD pipeline  

---

## ▶️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
DIRECT_URL=your_neon_database_direct_url
JWT_SECRET=your_secret
JWT_EXPIRES_IN=your_expires_in_jwt_format
SEED_USER_ID=your_seed_id
NODE_ENV=development
```

---

### 3. Setup database

```bash
npx prisma db push
```

or (if using migrations):

```bash
npx prisma migrate dev
```

---

### 4. Run the project

```bash
npm run dev
```