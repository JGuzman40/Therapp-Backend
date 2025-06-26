// utils/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const createUpload = (folderName = "spatherapp") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "pdf", "mp4", "docx", "mp3", "wav", "webm"],
    },
  });

  return multer({ storage });
};

module.exports = createUpload;
