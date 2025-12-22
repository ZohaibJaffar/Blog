const {getUser} = require('../util/service.js')

async function restrictToUser(req,res,next){
    console.log(req.cookie)
    const token = req.cookies?.uid
    console.log(token)
    if(!token) return res.redirect('/signin')
    const user = getUser(token)
    if(!user) return res.redirect('/signin')

        user.req = user 
        next()

    
}

module.exports = {restrictToUser}