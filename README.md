# 📝 MERN Stack Notes App - Backend API

A robust RESTful API built with **Node.js, Express, MongoDB (Mongoose), and JWT Authentication**. This backend powers a feature-rich Notes application supporting full CRUD operations, note management (pinning, archiving, soft deletion/trash), search functionality, and strict user data isolation.

---

## ✨ Features

- **User Authentication & Authorization:** 
  - User Registration & Login with encrypted passwords using `bcryptjs`.
  - Secure stateful access using **JSON Web Tokens (JWT)** via Bearer Headers.
- **Data Isolation & Security:** 
  - Strict middleware-level check (`protect` route middleware) ensuring users can only view, edit, or delete their own notes.
- **Notes Management (CRUD):**
  - Create, Read, Update, and Delete notes with tags and custom colors.
  - Search notes by title or content (`?search=query`).
- **Advanced State Controls:**
  - **Pin / Unpin Notes:** Toggle important notes to keep them prioritized.
  - **Archive Notes:** Keep workspace clean by archiving older notes.
  - **Trash & Restore System:** Soft-delete system moves notes to trash instead of permanent removal, allowing single-click restoration.
- **Error Handling & Middleware:**
  - Global centralized error handling middleware.
  - HTTP Request Logging via `morgan`.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas / Local MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken) & bcryptjs
- **API Testing:** Thunder Client / Postman

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB installation

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/notes-app.git](https://github.com/your-username/notes-app.git)
   cd notes-app/server
