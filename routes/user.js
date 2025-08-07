const {Router} = require('express');
const bcrypt=require('bcrypt');
const userRouter = Router();
const JWT=require('jsonwebtoken');
const {userModel, courseModel, purchaseModel} = require('../db');

const {JWT_USER_KEY}=require('../config')
const {userMiddleware}=require('../middleware/userMiddleware');


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
const token =await JWT.sign({ userid : user._id },JWT_USER_KEY);
res.json({ token : token }) 
console.log('token generated successfully for user')
     }  
  }


catch(err){
    res.json({ message: err.message })
   }
})

userRouter.post('/purchase', userMiddleware , async function(req,res){
    const  userId=req.userId;
  
  try{
    const courseId=req.body.courseId;
    await purchaseModel.create({
         userId,
        courseId
    })

    res.json({
    message:'all your purchases'
    })
}

catch(err){
    res.json({  
        message:err.message
    })
}

})

userRouter.get('/preview', async function(req,res){
    const courses=await courseModel.find({}); 
    res.json({
     courses
    })
})

userRouter.get('/purchases', middleware,async function(req,res){
 const userId=req.userId;
 const purchases = await purchaseModel.find({
    _id:userId
 })

 const purchasedData=await courseModel.find({
    _id:{  $in: purchases.map(x => x.courseId)  }
 })
    res.json({
     purchases,
     purchasedData
    })
})

module.exports={
    userRouter:userRouter
}