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
    // const fs = require('fs'); // Import the 'fs' module
    //         // Delete the uploaded file from the server's file system
    //         fs.unlink(req.file.path, (deleteErr) => {
    //           if (deleteErr) {
    //               console.error('Error deleting uploaded file:', deleteErr);
    //           } else {
    //               console.log('Uploaded file deleted successfully.');
    //           }
    //       });
    const secureUrl = result.secure_url;
    res.status(200).json({
      success: true,
      message:"Uploaded!",
      secureUrl: secureUrl
    });
  });
});

router.post('/profilePic', async function (req, res) {
  try {
    const { userId, profilePic } = req.body;

    if (!userId || !profilePic) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Missing userId or profilePic.",
      });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update the profilePic field and save the user object
    user.profilePic = profilePic;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded and saved successfully!",
      secureUrl: profilePic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error",
      error: err.message,
    });
  }
});



module.exports = router;