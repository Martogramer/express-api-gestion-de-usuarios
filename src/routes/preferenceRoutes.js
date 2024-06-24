const express = require("express");
const { response } = require("../controllers/preferenceController.js");

const router = express.Router();

router.post("/create_preference", response);

module.exports = router;
