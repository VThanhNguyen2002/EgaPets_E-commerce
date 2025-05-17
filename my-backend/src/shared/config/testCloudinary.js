require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload("path/to/test-image.jpg", {
  folder: "test"
})
.then(result => console.log("Uploaded ✅", result.secure_url))
.catch(err => console.error("Upload failed ❌", err));
