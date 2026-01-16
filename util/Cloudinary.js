const cloudinary = require("cloudinary").v2;
const fs = require('fs')
// Configuration
cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret
    })

async function uploadOnCloudinary(filePath){
    try {
        if(!filePath) return null;
        const respones = await cloudinary.uploader.upload(filePath,{
            resource_type : "auto"
        })

        // File has been uploaded successfully, remove it from local server
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.log("The file is has been uploaded on Cloudinary ",respones.url)
    return respones
        } catch (error) {
        if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // No callback needed
    }
    return null;
    }
    
}

module.exports = uploadOnCloudinary