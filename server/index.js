const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => console.log("Server running on port 5000"));