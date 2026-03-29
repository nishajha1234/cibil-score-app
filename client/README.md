# CIBIL Score Checker

This is a full-stack web app where a user can check their credit score by entering their name and PAN number.

The project simulates how a real credit system works, including reusing previously generated data if the same user checks again within a few days.

---

## 🔗 Live Demo

Frontend: https://your-app.vercel.app
Backend: https://your-app.onrender.com

---

## 🧠 What this project does

* User enters Name and PAN
* System generates a credit score (mocked)
* If the same PAN is used again within 5 days, the previous result is shown
* Shows when the data was last generated

---

## ⚙️ Tech Stack

* Frontend: React + Tailwind CSS
* Backend: Node.js + Express
* Database: MongoDB

---

## 🔁 How it works (simple)

1. User submits details
2. Backend checks database:

   * If data exists and is recent → reuse it
   * Else → generate new score and save
3. Frontend displays score and message

---

## ▶️ Run locally

### Backend

```bash
cd server
npm install
```

Create `.env`:

```
MONGO_URI=your_mongo_uri
```

Run:

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
```

Create `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```

Run:

```bash
npm start
```

---

## 📝 Notes

* Credit score is mocked (no real API used)
* PAN is used as unique identifier
* Focus was on logic + user experience

---

## 👩‍💻 Author

Nisha Jha

---
