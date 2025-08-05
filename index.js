const express=require('express');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const {coursesRouter} = require('./routes/course')

const app=express();

app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',coursesRouter);


app.listen(3000,()=>{
    console.log('http://local:3000')
});