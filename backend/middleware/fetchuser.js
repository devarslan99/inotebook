const jwt = require('jsonwebtoken');
const JWT_SECRET = "arslanisgooddeveloper";

  const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');
    
     if(!token){
        return res.status(401).json({ errors: 'please authenticate using valid authentication'});
     }
   
    try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();


    } catch (error) {
    
        return res.status(401).json({ errors: 'please authenticate using valid authentication'});
    
    }


  }


  module.exports=fetchuser;