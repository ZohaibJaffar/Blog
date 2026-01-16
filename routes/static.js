const express = require("express")
const User = require("../models/User.js")
const Blog = require( '../models/blog.js')
const Comment = require( '../models/comments.js')
const staticRoutes = express.Router()







staticRoutes.get('/signup',(req,res)=>{
    res.render("signup")
})

staticRoutes.get('/',async (req,res)=>{
    try {
        
        const email = req.user ? req.user.email : null;
         const user = await User.find({email})
         console.log(user)
         const allBlogs = await Blog.find({})
         return res.render("home",{
             user : user,
             blogs : allBlogs
         })
    } catch (error) {
        console.log("There is an error",error)
    }
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

    staticRoutes.get("/:id",async (req,res)=>{
        const blog = await Blog.findById(req.params.id).populate('createdBy')
        const comments = await Comment.find({blogId : req.params.id}).populate('createdBy')
        res.render('blog',{
            user :req.user,
            blog,
            comments
        })
    })


    // staticRoutes.get('/favicon.ico', (req, res) => res.status(204).end());
module.exports = staticRoutes