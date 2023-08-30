const User = require ("../models/user.js");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const userSignup = async (req, res) => {
    try {
        // Check if the email already exists
        const checkEmail = await User.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        // Check if the username already exists
        const checkUsername = await User.findOne({ username: req.body.username });
        if (checkUsername) {
            return res.status(400).json({ msg: "Username already in use" });
        }

        // If neither exists, continue with user creation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { username: req.body.username, email: req.body.email, password: hashedPassword };
        const createdUser = await User.create(user);
        const token = jwt.sign({ id: createdUser._id }, "Events");
        res.json({ token });

    } catch (error) {
      if (error.code === 11000) {
          return res.status(400).json({ msg: "Email or username already in use" });
      }
      console.log("Error:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
}



  const userLogin = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).json({msg: "User not found with the provided email"});
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            const token = jwt.sign({id: user._id}, "Events");
            return res.status(200).json({token});
        } else {
            return res.status(401).json({msg: "Wrong password"});
        }
    });
};


const verifyUser = async (req, res) => {
    if (!req.body.token) {
        return res.status(400).json({msg: "Token not provided"});
    }
    try {
        const payload = jwt.verify(req.body.token, "Events");
        const user = await User.findById(payload.id);
        if (!user) {
            return res.status(404).json({msg: "User not found with the provided token"});
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(401).json({msg: "Invalid Token"});
    }
};




async function updateUserById(req, res) {
  const { userId, username, email, password } = req.body;

  if (req.params.id !== userId) {
    return res.status(401).json("You can update only your account!");
  }

  try {
      // If updating username, check if it already exists
      if (username) {
          const existingUserWithUsername = await User.findOne({ username });
          if (existingUserWithUsername && String(existingUserWithUsername._id) !== userId) {
              return res.status(400).json({ msg: "Username is already in use." });
          }
      }

      // If updating email, check if it already exists
      if (email) {
          const existingUserWithEmail = await User.findOne({ email });
          if (existingUserWithEmail && String(existingUserWithEmail._id) !== userId) {
              return res.status(400).json({ msg: "Email is already in use." });
          }
      }

      // If updating password, hash it
      if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
      }

      // Now update the user
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
      );

      res.status(200).json(updatedUser);

  } catch (err) {
      console.error(err);
      res.status(500).json({msg: "Internal Server Error"});
  }
}
  

  async function deleteUserById(req, res) {
    if (req.params.id === req.body.userId) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
      } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Internal Server Error"});
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  }

  async function findById(req, res) {
    try {
      const userId = req.params._id; // Get the user ID from the request parameters
      const user = await User.findById(userId); // Fetch the user from the database
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, user: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: err.message
      });
    }
  }

// Fetch usernames of event creators based on user IDs
async function getUsernames(req, res)  {
  try {
    const { userIds } = req.body;

    const usernames = await User.find({ _id: { $in: userIds } }, 'username');

    res.status(200).json(usernames);
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).json({ error: 'An error occurred while fetching usernames' });
  }
};


module.exports ={
    userSignup,
    userLogin,
    verifyUser,
    updateUserById,
    deleteUserById,
    findById,
    getUsernames,
};
