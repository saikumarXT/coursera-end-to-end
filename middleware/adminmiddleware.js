
const JWT = require('jsonwebtoken');
const{ JWT_ADMIN_KEY } = require('../config');

async function adminMiddleware(req,res,next){
 try{
const token= req.headers.token;
const decodedData = JWT.verify(token,JWT_ADMIN_KEY);
if(decodedData){
req.userId=decodedData.userId;
next();
    }
}
  catch(err){
  res.json({
  message:err.message})
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}