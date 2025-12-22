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
    const body=  req.body
    console.log(body)
    const user = await User.matchPassword(body.email , body.password)
    console.log('User',user)
    if(!user) return res.redirect('/signin')
        
        const token = setUser(user)

        res.cookie('uid',token)
    return res.redirect('/')

    



    
}

module.exports = {handleSignupPost,handleSigninPost}