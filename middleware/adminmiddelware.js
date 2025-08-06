
const JWT = require('jsonwebtoken');
const{ JWT_ADMIN_KEY } = require('../config');

async function adminMiddleware( ){

const token = req.body.headers;
const decodedData = JWT.verify(token,JWT_ADMIN_KEY);

if(decodedData){
req.body=userId;
next();
  }
  else{
    res.status(403).json({
        message:'you are not sign in'
    })
  }
}

module.exports={
    adminMiddleware:adminMiddleware
}