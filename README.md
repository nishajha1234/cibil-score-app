# 📊 CIBIL Score Checker

This is a full-stack web app where a user can check their credit score by entering their name and PAN number.

The project simulates how real systems (like TransUnion CIBIL) work, including caching previously generated data to improve performance and user experience.

---

## 🔗 Live Demo

Frontend: https://your-app.vercel.app  
Backend: https://your-app.onrender.com  

---

## 🧠 What this project does

- User enters Name and PAN
- System generates a credit score (mocked)
- If the same PAN is used again within **5 days**, previous result is shown
- Displays:
  - Credit score
  - Category (Poor / Fair / Good / Excellent)
  - Last generated time

---

## ⚙️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

---

## 🔁 How it works (Simple Flow)

1. User submits details (Name + PAN)
2. Backend checks database:
   - If data exists and is recent (≤ 5 days) → reuse it ✅
   - Else → generate new score and save ❌➡️✅
3. Frontend displays score and report

---

## 🧠 Approach Taken

- Built a **mock CIBIL system** (since real APIs are restricted)
- Implemented **time-based caching (5 days)** to avoid unnecessary recomputation
- Used PAN as a **unique identifier**
- Followed **MVC structure** in backend
- Focused on **clean UI + fast response**

---

## ⚙️ Assumptions Made

- Credit score is mocked (range: 300–900)
- PAN is unique per user
- Cache validity = 5 days
- No authentication (kept simple for demo)
- Single collection used in database

---

## 🚀 Key Highlights

- ✅ Real-world caching logic (important for fintech systems)
- ✅ Reduces unnecessary API calls
- ✅ Better performance and UX
- ✅ Clean backend structure
- ✅ Strong interview-ready project

---

## ▶️ Run locally

### Backend

```bash
cd server
npm install