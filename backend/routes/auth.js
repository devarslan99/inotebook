const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        a:'ars',
        number:1
    }
    res.json(obj)
})

module.exports=router
