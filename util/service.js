const jwt = require('jsonwebtoken')


function setUser(user){
    return jwt.sign({
        _id : user._id,
        name : user.fullName,
        email : user.email,
        profilePic : user.profile
    },process.env.Jwt_PrivateKey)
}
function getUser(Token){
    if(!Token) return null;
    try{
        return jwt.verify(Token,process.env.Jwt_PrivateKey)
    }catch(err){
        console.log("Invalid Token")
        return null 
    }
}

module.exports = {setUser,getUser} 