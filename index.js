require('dotenv').config()
console.log("Mongo URL:", process.env.MONGO_URL);




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
await mongoose.connect(process.env.MONGO_URL)
app.listen(3000,()=>{
    console.log('http://local:3000')
});
}
