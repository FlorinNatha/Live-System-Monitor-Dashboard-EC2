const express = require("express");
const { getSystemMetrics } = require("../controllers/metricsController");

const router = express.Router();

router.get("/", getSystemMetrics);

module.exports = router;
