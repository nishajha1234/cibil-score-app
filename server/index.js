const express = require("express");
const connectDB = require("./config/db");
const cibilRoutes = require("./routes/cibil");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

connectDB();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://cibil-score.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use("/api/cibil", cibilRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));