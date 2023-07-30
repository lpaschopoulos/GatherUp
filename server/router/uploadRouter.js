const express = require('express');
const router = express.Router();
const cloudinary = require("../models/cloudinary");
const upload = require("../models/multer");
const path = require("path");

 router.post('/uploads', upload.single('image'), function (req, res) {
  console.log(req.file);
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }
    const secureUrl = result.secure_url;
    res.status(200).json({
      success: true,
      message:"Uploaded!",
      secureUrl: secureUrl
    });
  });
});

module.exports = router;