const User = require ("../models/user.js");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const userSignup = async (req, res) =>{
    try {
      const checkUser = await User.findOne({email: req.body.email})
      if (checkUser) {
        res.send({msg: "email already in use"})
        return
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
          const user = { email: req.body.email, password: hash}
          const createdUser = await User.create(user);
          const token = jwt.sign({id: createdUser._id}, "Events")
          res.send({token})         
        });
    });
    } catch (error) {
      console.log("Error:", error);
    }
  }

const userLogin = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        bcrypt.compare(req.body.password, user.password, function (err, result){
            if (result){
                const token = jwt.sign({id: user._id}, "Events");
                res.send ({token});
            } else {
                res.send ({msg: "wrong password"});
            }
        });
    } else{
        res.send ({msg: "wrong email"});
    }


};

const verifyUser = async (req, res) =>{
    if (!req.body.token){
        res.send({msg:false});
        return
    }
    try {
        const payload = jwt.verify(req.body.token, "Events");
        if (payload){
            const user = await User.findOne({ _id:payload.id});
            if(user){
                const token = jwt.sign({ id: user._id}, "Events");
                res.send(user);
            } else {
                res.send("Invalid Token");
            }
        } else {
            res.send ("Invalid Token");
        }
    } catch (err) {
        res.send ("Invalid Token");
    }
};

module.exports ={
    userSignup,
    userLogin,
    verifyUser,
};
