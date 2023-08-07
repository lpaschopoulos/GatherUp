const express = require('express');
const router = express.Router();
const cloudinary = require("../models/cloudinary");
const upload = require("../models/multer");
const path = require("path");
const User = require("../models/user");

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

router.post('/profilePic', upload.single('image'), async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const secureUrl = result.secure_url;

    const userId = req.body.userId || req.headers.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No user ID provided."
      });
    }

    await User.findByIdAndUpdate(userId, { profilePic: secureUrl });

    res.status(200).json({
      success: true,
      message: "Profile image uploaded!",
      secureUrl: secureUrl
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error",
      error: err.message
    });
  }
});

module.exports = router;