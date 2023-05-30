const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "arslanisgooddeveloper";
const fetchuser=require('../middleware/fetchuser')

// Route:1 create a user using post:/api/auth/createuser  -no login required

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid name').isEmail(),
  body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

  //if there are errors then return bad request and errors also
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }




  try {
    //check whether the user with this email exist already
    let user = await User.findOne({ email: req.body.email });

    if (user) {

      return res.status(400).json({ error: "sorry the user with this email already exist" });
    }

    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(pass, salt)

    ///create a new user 
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass

    })

   
    const data = {
      user: {
        id: user.id
      }
    }
    var authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });

  } catch (error) {

    ///if there is any kind of error 
    res.status(500).send("internal server error");
  }

})




  //Route:2 login user with post:/api/auth/login  -no login required



router.post('/login', [
  body('email', 'Enter a valid name').isEmail(),
  body('password', 'password should not blank').exists(),

], async (req, res) => {

  let success=false;
  //if there are errors then return bad request and errors also
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });

  }


  const { email, password } = req.body;

  try {
    //check whether the user with this email exist already
    let user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({ error: "please enter valid credentialssss" });
    }


    const passwordcompare =await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ success,error: "please enter valid credentials1" });
    }




    const data = {
      user: {
        id: user.id
      }
    }
    
    var authtoken = jwt.sign(data, JWT_SECRET);
    let success=true;
    res.json({ success,authtoken });



  } catch (error) { 

      console.log(error.message)
    ///if there is any kind of error 
    res.status(500).send("internal server error");
  }

})



  //Route:3 get loggedin user detail with post:/api/auth/getuser -login required

 


  router.post('/getuser',fetchuser, async (req, res) => {
  
    //if there are errors then return bad request and errors also
    try {
      
      userId=req.user.id;
      const user=await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("interval server error");
    }
  })

module.exports = router
