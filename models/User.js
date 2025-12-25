const { timeStamp } = require('console')
//createHmac is used for Hashing the password
// const {createHmac, randomBytes}= require('crypto')
const bcrypt = require('bcrypt')
const {Mongoose, default: mongoose}= require('mongoose')
const {setUser} = require("../util/service.js")

 const userSchema  =  new mongoose.Schema({
    fullName:{
        type: String,
        required : true
    },
    email :{
         type: String,
        required : true,
        unique : true
        
    },
    salt : {
         type: String,
    
    },
    password:{
         type: String,
        required : true
    },
    profile :{
        type : String,
        default : "/image/avatar.png"
    },
    role :{
        type: String,
        enum : ['USER',"ADMIN"],
        default : 'USER'
    }
},{timestamps : true})
//pre means before saving the data in database 
userSchema.pre('save', async function(next){
    try{
    const user = this
    if(!user.isModified("password")) return ;
    // if(!user.isModified("password")) return ;
    // //salt is random string it is a scret key 
    // const salt = randomBytes(16).toString('hex')
    // // sha256 is a algorithm 
    // const hashedPassword = createHmac('sha256',salt)
    // .update(user.password)
    // .digest('hex')

    // this.salt = salt
    // this.password = hashedPassword
    const hash =  await bcrypt.hash(user.password,10)
    user.password = hash
    
}catch(err){
        next(err)
    }
})
//this is  a function for check the password 
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({email})
    if (!user) return null;
    const checkpass = await bcrypt.compare(password, user.password)
    if(!checkpass) throw new Error ("Incorrect Password")
    return setUser(user)
    // if (!user) return null;
    // const salt = user.salt
    // const hashedPassword = user.password

    //  const userhashedPassword = createHmac('sha256',salt)
    // .update(password)
    // .digest('hex')
    // if(hashedPassword !== userhashedPassword) throw new Error ("Incorrect Password")
    // return setUser(user)
})

const User = mongoose.model('User',userSchema)

module.exports = User