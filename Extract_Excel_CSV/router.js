const express = require("express");
const router = express.Router();
const controller = require("./controller")
const multer = require("./helper/multer")

router.post("/",multer.imageUpload.single('file'), controller.addData);

router.get("/", controller.getData);

router.get("/:id", controller.getDataById);

module.exports = router;