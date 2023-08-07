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

    const userId = req.body.userId; // Extracting userId from the body of the request.
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No user ID provided."
      });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Update the profilePic field and save the user object
    user.profilePic = secureUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded and saved successfully!",
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