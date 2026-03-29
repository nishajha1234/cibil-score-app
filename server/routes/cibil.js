const express = require("express");
const router = express.Router();

// Import controller
const { checkCibil } = require("../controllers/cibil.controller");

// Route
router.post("/check", checkCibil);

module.exports = router;