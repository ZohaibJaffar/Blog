const express = require('express')
const {handleSignupPost,handleSigninPost,handleNewBlog} = require("../controllers/controllers.js")

const routes = express.Router()

routes.post('/signup',handleSignupPost)
// routes.get("/signup")
routes.post("/signin",handleSigninPost)
routes.post("/addblog",handleNewBlog)


module.exports = routes