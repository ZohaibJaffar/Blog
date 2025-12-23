const express = require("express")


const staticRoutes = express.Router()


staticRoutes.get('/signup',(req,res)=>{
    res.render("signup")
})

staticRoutes.get('/',(req,res)=>{
    res.render("home",{
        user : req.user
    })
})

staticRoutes.get('/signin',(req,res)=>{
    res.render("signin")
})

staticRoutes.get("/logout",(req,res)=>{
        res.clearCookie('uid').redirect('/')

    })
    staticRoutes.get("/addblogs",(req,res)=>{
        res.render("addblog",{
            user : req.user
        })
    })

module.exports = staticRoutes