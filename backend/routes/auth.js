const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { query, validationResult } = require('express-validator');


//create a user using post:/api/auth-Does not require auth
router.post('/',(req,res)=>{
    const user=User(req.body);
    user.save();
    console.log(req.body);
    res.send(req.body);

    // res.json([])
})

module.exports=router
