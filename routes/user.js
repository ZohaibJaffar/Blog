const express = require('express')
const {handleSignupPost,handleSigninPost} = require("../controllers/controllers.js")

const routes = express.Router()

routes.post('/signup',handleSignupPost)
// routes.get("/signup")
routes.post("/signin",handleSigninPost)


module.exports = routes