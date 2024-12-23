# Blog AI System

A full-stack application that leverages AI (Gemini API) to generate blog content. The application integrates **Google OAuth 2.0** for authentication, **MySQL** for database management, and a responsive user interface built with **React 18**. 

---

## 🛠️ Tech Stack
- **Frontend:** React 18
- **Backend:** Node.js / Express
- **Database:** MySQL
- **Authentication:** Google OAuth 2.0
- **AI:** Google Gemini API

---

## 🚀 Features
### **Authentication**
- Google OAuth 2.0 integration
- JWT token-based session management
- Local authentication with password hashing (bcrypt)

### **Blog Generation**
- AI-powered blog creation via Gemini API
- Content generation based on keywords and sentences
- Search history tracking for blogs

### **User Interface**
- Responsive and interactive dashboard
- Sidebar for search history
- Content formatting features
- User profile management

### **Security**
- Password hashing (bcrypt)
- JWT-based authentication
- CORS configuration for secure API calls
- OAuth 2.0 security measures

---

## 📂 Project Structure
### **Backend (server/)**
- `config/`
  - `db.js`: Database configuration
  - `passport.js`: Authentication setup
- `models/`
  - `user.js`: User schema
  - `blog.js`: Blog schema
- `routes/`
  - `auth.js`: Authentication routes
  - `blog.js`: Blog-related routes
- `server.js`: Main server entry point

### **Frontend (src/)**
- `components/`
  - `dashboard.js`: Dashboard view
  - `authsuccess.js`: Authentication success screen
  - `login.js`: Login form
  - `signup.js`: Registration form
  - `history.js`: Search history view
- `styles/`: CSS files for styling
- `service/api.js`: API service functions
- `app.js`: Main React component
- `app.css`: Global styles

---

## ⚙️ Setup Instructions

### **Prerequisites**
- Node.js v14+
- MySQL 8+
- Google OAuth credentials

### **1. Clone Repository**

git clone https://github.com/Avinesh-2001/Blog-System-AI.git
cd blog-system

### **2. Backend

cd server
npm install express mysql2 passport passport-google-oauth20 jsonwebtoken
npm install

node server.js

### **3. Frontend

cd ..
npm install react react-dom axios react-router-dom @google-cloud/vertexai
npm install

npm start

### **4. Database Setup

CREATE DATABASE blog_system;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    googleId VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    keywords VARCHAR(255),
    sentence TEXT,
    generated_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

🔗 Running the Application
Backend: http://localhost:5000
Frontend: http://localhost:3000
Access the application via the frontend URL.

Demo Link : https://drive.google.com/file/d/1FSVbKK9E38U6C3XKiy-fYe5eTDJDCuvK/view?usp=sharing



