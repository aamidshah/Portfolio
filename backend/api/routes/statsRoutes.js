
const express = require("express");

const {getStats, getStatsByDate} = require("../controllers/statsController")
const router = express.Router();


router.get("/projects", getStats);

module.exports = router;
