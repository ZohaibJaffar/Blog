const express = require("express")

const Blog = require( '../models/blog.js')
const staticRoutes = express.Router()


staticRoutes.get('/signup',(req,res)=>{
    res.render("signup")
})

staticRoutes.get('/',async (req,res)=>{
    
    const allBlogs = await Blog.find({})
    console.log(allBlogs)
    return res.render("home",{
        user : req.user,
        blogs : allBlogs
    })
})

staticRoutes.get('/signin',(req,res)=>{
    return res.render("signin")
})

staticRoutes.get("/logout",(req,res)=>{
        return res.clearCookie('uid').redirect('/')

    })
    staticRoutes.get("/addblog",(req,res)=>{
        return res.render("addblog",{
            user : req.user
        })
    })

module.exports = staticRoutes