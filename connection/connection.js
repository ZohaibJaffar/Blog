const mongoose = require("mongoose")

async function DBconnection(url){
    try{
    mongoDB = await mongoose.connect(url)
    console.log("Database is connected successfully🎉")
    return mongoDB
}catch(err){
        console.log("There is error in connection",err)
    }
}

module.exports = DBconnection