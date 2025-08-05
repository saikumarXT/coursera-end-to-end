const { Router } = require('express');

const userRouter = Router();

userRouter.get('/signup',async function(req,res){
    res.json({
        message:'signup'
    })
})

userRouter.get('/signin',async function(req,res){
    res.json({
        message:'signin'
    })
})

userRouter.get('/purchases',async function(req,res){
    res.json({
        message:'all your purchases'
    })
})

module.exports={
    userRouter:userRouter
}