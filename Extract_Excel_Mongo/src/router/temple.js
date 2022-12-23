const express = require("express");
const router = express.Router();
const {templeController} = require("../controller")
const {imageUpload} = require("../helper/multer")

router.post("/",imageUpload.single("image") ,templeController.addTemple)

router.delete("/", templeController.deleteAll);

router.get("/", templeController.getData);

router.post("/fitness",imageUpload.single("image") ,templeController.spiritualFitness)

module.exports = router