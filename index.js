const express=require('express')
const JWT=require('jsonwebtoken');
const mongoose=require('mongoose');



const app=express();

app.post('/user/signup',async function(req,res){
    const username=req.body.username;
    const password=req.body.password;
await UserModel.create({
    username:username,
    password:password })
})


app.post('/user/signin',async function(req,res){
const username=req.body.username;
const password=req.body.password;

res.json({
    message:"signin endpoint"
   })
})

app.post("/user/purchases",async function(req,res){
    res.json({
        message:'purchase'
    })
})


app.post("/user/purchase",async function(req,res){
    res.json({
        message:'purchase'
    })
})


app.post("/courses",async function(req,res){
    res.json({
        message:'purchase'
    })
})