const express = require("express");
const connectDB = require("./config/db");
const cibilRoutes = require("./routes/cibil");
const cors = require("cors");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/cibil", cibilRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => console.log("Server running on port 5000"));