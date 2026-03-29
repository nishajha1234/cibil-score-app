const express = require("express");
const router = express.Router();

const { checkCibil } = require("../controllers/cibil.controller");

router.post("/check", checkCibil);

module.exports = router;