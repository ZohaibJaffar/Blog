 const jwt = require('jsonwebtoken')
 privateKey = process.env.Jwt_PrivateKey

function setUser(user){
    return jwt.sign({
        _id : user._id,
        name : user.fullName,
        email : user.email,
        profilePic : user.profile
    },privateKey)
}
function getUser(Token){
    if(!Token) return null;
    try{
        return jwt.verify(Token,privateKey)
    }catch(err){
        console.log("Invalid Token")
        return null 
    }
}

module.exports = {setUser,getUser} 