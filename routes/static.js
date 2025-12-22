const express = require("express")
const {restrictToUser} = require('../middlewares/auth.js')


const staticRoutes = express.Router()

staticRoutes.get('/signup',(req,res)=>{
    res.render("signup")
})

staticRoutes.get('/',restrictToUser,(req,res)=>{
    res.render("home")
})

staticRoutes.get('/signin',(req,res)=>{
    res.render("signin")
})

module.exports = staticRoutes