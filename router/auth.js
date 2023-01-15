const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const cookieParser = require('cookie-parser');
const authentication = require("../middleware/authentication")
require("../Database/dbConnection");
const User = require("../Database/dbSchema");


//                                                        register route

router.post("/signup-user", async (req, res) => {
  console.log(req.body);
  const { name, studentId, password } = req.body;
  if (!name || !studentId || !password) {
    return res.status(401).json({ error: "Plz fill all the details" });
  }

  try {
    const userExist = await User.findOne({ studentId: studentId });

    if (userExist) {
      return res.status(422).json({ error: "student already exist" });
    }

    const user = new User({
      name: name,
      studentId: studentId,
      password: password,
    });

    await user.save();
    res.status(201).json({ message: "student data added successfully" });
  } catch (error) {
    console.log(err);
  }
});

//              login route

router.post("/login-user", async (req, res) => {
  const { studentId, password } = req.body;
  console.log(req.body);
  if (!password || !studentId) {
    return res.status(400).json({ error: "plz fill all the fields" });
  }

  try {
    const userExist = await User.findOne({
      studentId: studentId,
    });
    if (!userExist) {
      return res.status(400).json({ message: "creditional are invalid" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ error: "wrong password" });
    }
    const token = await userExist.generateAuthToken(); ////////////            token generation


    //             cookie creation
    
    // res.cookie("jwtoken", token, {
    //   path:"http://localhost:5000/signup-user",
    //   maxAge: 900000,
    //   httpOnly: true,
    // });

    return res.status(200).json({"token":token});
  } catch (error) {
    console.log(error);
  }
});

// secret page authentication from server 
router.post("/secret", authentication, (req,res)=> {
  res.json(req.rootUser);
});

module.exports = router;

// in post man in header => Content-Type  application/json
