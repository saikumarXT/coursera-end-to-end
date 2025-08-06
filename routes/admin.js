const {Router} = require('express');
const adminRouter=Router();
const {adminModel}=require('../db.js')
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken')
const { JWT_ADMIN_KEY }=require('../config.js')
const { adminMiddleware }=require('../adminMiddleware');


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
const token =await JWT.sign({ userId : user._id.toString() },JWT_ADMIN_KEY);
res.json({ token:token }) 
console.log('token generated successfully')
     }  
  }


catch(err){
    res.json({ message: err.message })
   }

})


adminRouter.post('/course', adminMiddleware  , async function (req,res){
    res.json({
        message:'sign-in for admin'
    })
})


adminRouter.put('/course', adminMiddleware, async function (req,res){
    res.json({
        message:'get'
    })
})

adminRouter.get('course/bulk', adminMiddleware, async function (req,res){
    res.json({
        message:'get'
    })
})


module.exports = {
    adminRouter:adminRouter
}
