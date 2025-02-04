📖 Flashcards App

## 🚀 Overview

The **Flashcards App** is a web-based application designed to help users create, manage, and study flashcards efficiently. With document upload capabilities and automatic flashcard generation using **Natural Language Processing (NLP)**, this app is perfect for students, professionals, and lifelong learners.

### ✨ Features

- **User Authentication** – Secure login with JWT authentication.
- **Flashcard Management** – Create, edit, and delete flashcards with ease.
- **Automated Flashcard Generation** – Upload PDFs or DOCX files and let the app generate flashcards for you.
- **Study Mode** – Track learning progress with visual indicators.
- **Responsive Design** – Optimized for both desktop and mobile.
- **Progress Tracking** – Visual representation of learning progress.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo/flashcards-app.git
cd flashcards-app
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables

🚨 **IMPORTANT:** The `.env` file contains sensitive information (MongoDB URI, JWT secret, and port specification) and is NOT included in the repository. You need to manually create it under the `/backend` directory.

Create a `.env` file inside the `backend/` directory with the following content:

```env
MONGO_URI=mongodb_uri
JWT_SECRET=jwt_secret
PORT=8000
```

---

## 🚀 Running the Application

### 1️⃣ Start the Backend

```bash
cd backend
node server.js
```

### 2️⃣ Start the Frontend

```bash
cd frontend
npm start
```

### 3️⃣ Open the App in Your Browser

🌍 **On Desktop:**  
Navigate to: [http://localhost:3000](http://localhost:3000)

📱 **On Mobile (Same Network Required):**  
Open the browser on your mobile device and go to:

```perl
http://your-local-ip:3000
```

(Replace `your-local-ip` with the actual IP address shown in your terminal when running `npm start`.)

---

## 📚 Usage Guide

- **Home Page** – Navigate through the app easily.
- **Dashboard** – View your progress and quick access to flashcard sets.
- **Library** – Browse and manage all your flashcard sets.
- **Create** – Generate new flashcards manually or upload a document for AI-generated flashcards.
- **Study Mode** – Engage in active recall with progress tracking.
- **Preview** – Check your flashcards before studying.

---

## 🔧 Future Improvements

- **Quiz Mode** – Test your knowledge with an interactive quiz feature.
- **Text-to-Speech** – Listen to your flashcards for better retention.
- **AI-Based Smart Suggestions** – Improve flashcard content using AI.

---

📝 **Happy Learning! 🚀**
