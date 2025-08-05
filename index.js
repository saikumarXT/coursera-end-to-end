const express=require('express');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const {coursesRouter} = require('./routes/course')
const {adminRouter} = require('./routes/admin')
const app=express();


app.use('/api/v1/user',userRouter);

app.use('/api/v1/admin',adminRouter);

app.use('/api/v1/course',coursesRouter);


async function main(){
await mongoose.connect('mongodb+srv://saipatel11431:FxpM9eZkeYj1fq5a@cluster1.wmja1ig.mongodb.net/coursera-app')
app.listen(3000,()=>{
    console.log('http://local:3000')
});
}