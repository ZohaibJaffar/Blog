const { timeStamp } = require('console')
//createHmac is used for Hashing the password
const {createHmac, randomBytes}= require('crypto')
const {Mongoose, default: mongoose}= require('mongoose')

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
userSchema.pre('save', async function(){
    try{
    const user = this
    if(!user.isModified("password")) return ;
    //salt is random string it is a scret key 
    const salt = randomBytes(16).toString('hex')
    // sha256 is a algorithm 
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt
    this.password = hashedPassword

    
}catch(err){
        next(err)
    }
})

userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email})
    if (!user) return null;
    const salt = user.salt
    const hashedPassword = user.password

     const userhashedPassword = createHmac('sha256',salt)
    .update(password)
    .digest('hex')
    if(hashedPassword !== userhashedPassword) throw new Error ("Incorrect Password")
    return user
})

const User = mongoose.model('User',userSchema)

module.exports = User