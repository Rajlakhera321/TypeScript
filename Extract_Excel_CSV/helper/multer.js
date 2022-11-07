const multer = require("multer")
const path = require("path")

const imageStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 5000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(xlsx|csv)$/)) { // upload only png and jpg format
            return cb(new Error('Please upload a xlsx and csv Image'))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}