const { Router } = require('express');

//const express=require('router);
//const router=express.router;

const coursesRouter=Router();
coursesRouter.get('/purchase',async function(req,res){
    res.json({
        message:'purchase'
    })
})


coursesRouter.get('/preview',async function(req,res){
    res.json({
        message:'preview'
    })
})


module.exports={
    coursesRouter:coursesRouter
}
