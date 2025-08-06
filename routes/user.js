const {Router} = require('express');
const bcrypt=require('bcrypt');
const userRouter = Router();
const JWT=require('jsonwebtoken');
const {userModel} = require('../db');

const {JWT_USER_KEY}=require('../config')
const {userMiddleware}=require('../userMiddleware');


userRouter.post('/signup',async function(req,res){
 const { email,password,firstName,lastName }=req.body;


try{
const hashedPassword = await bcrypt.hash(password,5)
if(hashedPassword){
       await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName })
     }
     res.json({ message:"user-signup success" })
  }
catch(err){
res.json({ message: err.message })
}


})

userRouter.post('/signin',async function(req,res){
const {email,password}=req.body;


try {
const user=await userModel.findOne({ 
    email:email
});
const verifyPassword= await bcrypt.compare(password, user.password);

if(!verifyPassword) {
res.json({ message: "invalid credentials of user" }) 
}

else{
const token =await JWT.sign({ userid : user._id.toString() },JWT_USER_KEY);
res.json({ token:token }) 
console.log('token generated successfully for user')
     }  
  }


catch(err){
    res.json({ message: err.message })
   }
})

userRouter.get('/purchases', userMiddleware , async function(req,res){
    res.json({
        message:'all your purchases'
    })
})

module.exports={
    userRouter:userRouter
}