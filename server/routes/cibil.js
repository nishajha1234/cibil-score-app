const express = require("express");
const router = express.Router();
const Cibil = require("../models/Cibil");

const generateScore = () => {
  return {
    score: Math.floor(600 + Math.random() * 200),
    report: "Good credit history",
  };
};

router.post("/check", async (req, res) => {
  const { pan, name } = req.body;

  const existing = await Cibil.findOne({ pan });

  if (existing) {
    const diffDays =
      (Date.now() - new Date(existing.createdAt)) /
      (1000 * 60 * 60 * 24);

    if (diffDays < 5) {
      return res.json({ source: "cache", data: existing });
    }
  }

  const mockData = generateScore();

  const newEntry = await Cibil.findOneAndUpdate(
    { pan },
    { ...mockData, pan, name, createdAt: Date.now() },
    { upsert: true, new: true }
  );

  res.json({ source: "fresh", data: newEntry });
});

module.exports = router;