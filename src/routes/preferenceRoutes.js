const express = require("express");
const { createPreference } = require("../controllers/preferenceController");

const router = express.Router();

router.post("/create_preference", createPreference);

module.exports = router;
