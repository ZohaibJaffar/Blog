const User = require('../models/User.js')
const {v4 : uuidv4} = require("uuid")
const {setUser} = require('../util/service.js')
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
    }
    

    

    



    
}

module.exports = {handleSignupPost,handleSigninPost}