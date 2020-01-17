const multer = require('multer')
const controller = require('../controllers')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +
            file.originalname.slice(file.originalname.lastIndexOf('.'),
                file.originalname.length))
    }
})

var upload = multer({
    storage
})

module.exports = upload