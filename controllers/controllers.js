const User = require('../models/User.js')
const Blog = require("../models/blog.js")
const Comment = require("../models/comments.js")
async function handleSignupPost(req,res){
    const body = req.body 
    const newUser = await User.create({
        fullName : body.fullName,
        email  : body.email,
        password : body.password
    })
    return res.redirect('/')
}

async function handleSigninPost(req,res){
    try{
        const body=  req.body
        const token = await User.matchPasswordAndGenerateToken(body.email , body.password)
            res.cookie('uid',token)
            console.log("Token Generated:", token); // DEBUG: See if token exists
    return res.redirect('/')
    }catch(error){
       return  res.render('signin',{
        error : "Invalid Email or Password"})
    }}
async function handleNewBlog(req,res){
    
    console.log(req.body)
    const {title , description} = req.body
    const newBlog = await Blog.create({
        title,
        description,
        image : `/blogs/${req.file.filename}`,
        createdBy : req.user._id

    })
    res.render("addblog",{
        user : req.user
    })
}

async function handleCommentPost(req,res){
    try{
    // If req.user doesn't exist, req.user._id will crash the app
    await Comment.create({
        content : req.body.content,
        createdBy : req.user._id,
        blogId: req.params.blogId
    })
    res.redirect(`/${req.params.blogId}`)}
    catch(error){
        console.log("error is held ")
    }
}
module.exports = {handleSignupPost,handleSigninPost,handleNewBlog,handleCommentPost}