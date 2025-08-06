# 📝 BlogSphere

**BlogSphere** is a full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, create and manage blogs, upload their own profile pictures, and explore content by different authors — all with a modern, responsive UI powered by Tailwind CSS.

---

## ✨ Features

- ✅ User registration and login (JWT authentication)
- 📝 Create, edit, and delete your own blogs
- 👤 Author profile pages with uploaded profile pictures
- 📄 View all blogs and blog details
- 🔐 Secure authentication and access control
- 🌈 Tailwind CSS for a modern responsive UI

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer (for profile pictures)

---

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Harshit-Jain1303/BlogSphere.git
cd BlogSphere
```
2. Setup Backend

```bash
cd blogsphere-backend
npm install
```

Create a .env file in the server/ folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
then you can start the backend.

3. Setup Frontend

```bash
cd ../blogsphere-frontend
npm install
npm start
```
And you are done.



📮 API Endpoints
Auth Routes
POST /api/users/register – Register new user

POST /api/users/login – Login and receive token

Blog Routes
GET /api/blogs – Fetch all blogs

POST /api/blogs – Create a new blog

PUT /api/blogs/:id – Edit blog

DELETE /api/blogs/:id – Delete blog

User Routes
POST /api/users/profile-pic – Upload profile picture

PUT /api/users/profile/:id – Update profile info

GET /api/users/:id – Get author info






Made by Harshit-Jain1303
