const User = require('../models/User.js')
const Blog = require("../models/blog.js")
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
module.exports = {handleSignupPost,handleSigninPost,handleNewBlog}