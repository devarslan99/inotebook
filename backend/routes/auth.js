const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "arslanisgooddeveloper";

//create a user using post:/api/auth/createuser  -no login require

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

    //  .then(user=>res.json(user))
    //  .catch(err=>{console.log(err)
    //  res.json({error:'please enter unique email',message:err.message})});


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




//create a user using post:/api/auth/createuser  -no login require



router.post('/login', [
  body('email', 'Enter a valid name').isEmail(),
  body('password', 'password should not blank').exists(),

], async (req, res) => {

  //if there are errors then return bad request and errors also
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }


  const { email, password } = req.body;

  try {
    //check whether the user with this email exist already
    let user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({ error: "please enter valid credentials" });
    }


    const passwordcompare =await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ error: "please enter valid credentials" });
    }




    const data = {
      user: {
        id: user.id
      }
    }
    var authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });



  } catch (error) { 

      console.log(error.message)
    ///if there is any kind of error 
    res.status(500).send("internal server error");
  }

})
module.exports = router
