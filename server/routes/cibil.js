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
  try {
    const { pan, name } = req.body;

    // ✅ Validation
    if (!pan || !name) {
      return res.status(400).json({ message: "Name and PAN are required" });
    }

    // ✅ Normalize PAN (IMPORTANT FIX)
    const normalizedPan = pan.toUpperCase().trim();

    const existing = await Cibil.findOne({ pan: normalizedPan });

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
      { pan: normalizedPan },
      { ...mockData, pan: normalizedPan, name, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json({ source: "fresh", data: newEntry });

  } catch (error) {
    console.error("CIBIL API Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;