const express = require('express')
const path = require ("path")
const multer = require ("multer")
const {handleSignupPost,handleSigninPost,handleNewBlog,handleCommentPost} = require("../controllers/controllers.js")

const routes = express.Router()
//multer is library for handle image 
const storage = multer.diskStorage({
    destination(req,file,cb){
        return cb(null, path.join(__dirname, "../public/blogs"))
    },
    filename(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})
const storages = multer.diskStorage({
    destination(req,file,cb){
        return cb(null, path.join(__dirname, "../public/image"))
    },
    filename(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const uploads = multer({storage :  storages})

routes.post('/signup',uploads.single('profile'),handleSignupPost)
// routes.get("/signup")
routes.post("/signin",handleSigninPost)
routes.post("/addblog",upload.single('image'),handleNewBlog)
routes.post('/:blogId',handleCommentPost)


module.exports = routes