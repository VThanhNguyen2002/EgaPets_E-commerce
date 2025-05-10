const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageFolder = path.join(__dirname, "../../../../public/images/Products");

fs.readdir(imageFolder, async (err, files) => {
  if (err) {
    console.error("❌ Error reading folder:", err);
    return;
  }

  const imagesToUpload = files.filter(file => file !== "P001.jpg"); // Bỏ đúng file gốc P001.jpg

  for (const file of imagesToUpload) {
    const match = file.match(/(P\d+)/); // Lấy productId ví dụ: P001, P002...
    if (!match) continue;

    const productId = match[1];
    const filePath = path.join(imageFolder, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `egapets/products/${productId}`,
      });
      console.log(`✅ Uploaded ${file} → ${productId}: ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
    }
  }
});
