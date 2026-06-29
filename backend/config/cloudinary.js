//configures and exports clodinary so that our application can securely upload and manages images and videos in the cloud.
//acts  like google drive . a cloud platform, photo is going to save in the cloudinary and the url will be saved in mongodb


const cloudinary = require("cloudinary")

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET        
    }
)

module.exports= cloudinary;
