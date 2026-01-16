const User = require('../models/User.js')
const Blog = require("../models/blog.js")
const Comment = require("../models/comments.js")
const uploadOnCloudinary = require("../util/Cloudinary.js")

// async function handleSignupPost(req,res){
    // const body = req.body 
    // const profile = req.file 
    //     ? `/image/${req.file.filename}` 
    //     : '/images/default-avatar.png'; // Make sure this folder/file exists
    //     const uploadCouldinary = uploadOnCloudinary(profile)
    //     const profileImage = uploadCouldinary.url
    //     console.log(profileImage)

    // const newUser = await User.create({
    //     fullName : body.fullName,
    //     email  : body.email,
    //     password : body.password,
    //     profile : profileImage
    // })
    // return res.redirect('/signin')
    async function handleSignupPost(req, res) {
    try {
        const body = req.body;
        let profileImage = '/images/default-avatar.png'; // Default fallback

        if (req.file) {
            // 1. Pass the actual local PATH, not the string URL
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            
            if (uploadResponse) {
                profileImage = uploadResponse.secure_url; // Use secure_url for HTTPS
            }
        }
        console.log(profileImage)

        const newUser = await User.create({
            fullName: body.fullName,
            email: body.email,
            password: body.password,
            profile: profileImage
        });

        return res.redirect('/signin');
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("Internal Server Error");
    }
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
    
    // console.log(req.body)
    const body = req.body; // Default fallback

        if (req.file) {
            // 1. Pass the actual local PATH, not the string URL
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            
            if (uploadResponse) {
                profileImage = uploadResponse.secure_url; // Use secure_url for HTTPS
            }
        }

    const newBlog = await Blog.create({
        title : body.title,
        description : body.description,
        image : profileImage,
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