const mongoose = require('mongoose');


const Schema=mongoose.Schema;
const objectId=mongoose.Types.ObjectId;

const usersSchema= new Schema({
email:{type:String, unique:true},
password:String, 
firstName:String,
lastNamer:String
})

const courseSchema=new Schema({
title:String,
description:String,
price:Number,
imageUrl:String,
creatorId:String
})

const adminSchema=new Schema({
email:{type:String,unique:true},
password:String,
firstName:String,
lastNamer:String

})
const PurchaseSchema= new Schema({
creatorId:String,
courseId:objectId,
userId:objectId
})

const userModel=mongoose.model('userName',usersSchema);
const adminModel=mongoose.model('admin',adminSchema);
const courseModel=mongoose.model('course', courseSchema);
const purchaseModel=mongoose.model('purchase',PurchaseSchema);

module.export={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}