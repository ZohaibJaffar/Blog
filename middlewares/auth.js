const {getUser} = require('../util/service.js')

function restrictToUser(uid){
    return (req,res,next)=>{
        const userCookie = req.cookies?.uid
        if(!userCookie){
            res.redirect("/signin")
        }
    try{
        const userPayload = getUser(userCookie)
        req.user = userPayload
        return next()
    }catch(err){

    }
    return next()
}
    
}

module.exports = {restrictToUser}