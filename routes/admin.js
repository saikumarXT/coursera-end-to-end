const {Router} = require('express');
const adminRouter=Router();
const {adminModel, courseModel}=require('../db.js')
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken')
const { JWT_ADMIN_KEY }=require('../config.js')
const { adminMiddleware }=require('../middleware/adminMiddleware');


adminRouter.post('/signup',async function (req,res){
const {email, password, firstName, lastName}=req.body;


try{
const hashedPassword = await bcrypt.hash(password,5)
if(hashedPassword){
       await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName })
     }
     res.json({ message:"admin-signup success" })
  }
catch(err){
res.json({ message: err.message })
}


})


adminRouter.post('/signin',async function (req,res){
const {email,password}=req.body;


try {
const user=await adminModel.findOne({ email:email });
const verifyPassword= await bcrypt.compare(password, user.password);

if(!verifyPassword) {
res.json({ message: "invalid credentials" }) 
}

else{
const token = JWT.sign({ userId : user._id },JWT_ADMIN_KEY);
res.json({ token:token }) 
console.log('token generated successfully')
     }  
  }


catch(err){
    res.json({ message: err.message })
   }

})


adminRouter.post('/course', adminMiddleware  , async function (req,res){
const {title , description , imageUrl , price}=req.body;
const adminId=req.userId;

try{
const course = await courseModel.create({
title:title,
description:description,
imageUrl:imageUrl,
price:price,
creatorId:adminId
})

res.json({
    message:"course added success-fully",
    courseId:course._id
   })
   console.log("course id at admin post:",course._id)
}

catch(err){
    res.json({
        message:err.message
    })
  }


})


adminRouter.put('/course', adminMiddleware, async function (req,res){
    const adminId=req.userId;
    const { title , description , imageUrl , price, courseId }=req.body;
    try{
    const updateCourse=await courseModel.updateOne ({
    creatorId:adminId,
    _id:courseId },

    {
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price,
    }
)
    res.json({
        message:'message added successfully',
        courseId:updateCourse._id
    })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }

    
})

adminRouter.get('/course/bulk', adminMiddleware, async function (req,res){
    const adminId=req.userId;

    try{
    const courses = await courseModel.find ({
    creatorId:adminId })

    res.json({
        message:'courses extracted successfully',
        courses })
    }

    catch(err) {
        res.json({ message:err.message })
    }

})


module.exports = {
    adminRouter:adminRouter
}
