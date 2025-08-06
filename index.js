const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const {coursesRouter} = require('./routes/course')
const {adminRouter} = require('./routes/admin')
const app=express();

app.use(express.json());

main();
/*async function userAuth(req, res, next){
    const token=req.body.token;
    const decode=JWT.verify(token,JWT_KEY);
    req.body=decode.userId;
    next();
}*/



app.use('/api/v1/user',userRouter);

app.use('/api/v1/admin',adminRouter);

app.use('/api/v1/course',coursesRouter);


async function main(){
await mongoose.connect('mongodb+srv://sai:1J5IOyJeToqHI0CR@cluster0.3vp3tpw.mongodb.net/')
app.listen(3005,()=>{
    console.log('http://local:3005')
});
}
