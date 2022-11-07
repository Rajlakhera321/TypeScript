const express = require("express");
const router = express.Router();
const controller = require("./controller")
const multer = require("./helper/multer")

router.post("/",multer.imageUpload.single('file'), controller.addData);

module.exports = router;