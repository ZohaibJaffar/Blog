const multer = require ("multer")
const path = require("path");

//multer is library for handle image 
const storage = multer.diskStorage({
    destination(req,file,cb){
        return cb(null, path.join(__dirname, "../public/blogs"))
    },
    filename(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
//this is a multer that handle the Profile image of user
const upload = multer({storage})

module.exports = upload