const express = require("express");
const router = express.Router();

router.use("/temple", require("./temple"));

module.exports = router