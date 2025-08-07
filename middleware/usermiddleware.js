const JWT=require('jsonwebtoken');
const {JWT_USER_KEY}=require('../config');

async function userMiddleware(req,res,next){

const token = req.headers.token;
const decodedData = JWT.verify(token,JWT_USER_KEY);

if(decodedData){
req.userId=decodedData.userId;
next();
  }

  else{
    res.status(403).json({  message:'you are not sign in' })
  }
}

module.exports={
    userMiddleware:userMiddleware
}