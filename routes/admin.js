const {Router} = require('express');
const adminRouter=Router();
const {adminModel}=require('../db.js')

adminRouter.post('/signup',async function (req,res){
    res.json({
        message:'sign-up for admin'
    })
})


adminRouter.post('/signin',async function (req,res){
    res.json({
        message:'sign-in for admin'
    })
})

adminRouter.post('/course',async function (req,res){
    res.json({
        message:'sign-in for admin'
    })
})

adminRouter.put('/course',async function (req,res){
    res.json({
        message:'get'
    })
})

adminRouter.get('/course/bulk',async function (req,res){
    res.json({
        message:'get'
    })
})


module.exports={
    adminRouter:adminRouter
}
