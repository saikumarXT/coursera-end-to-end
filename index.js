const express=require('express')
const JWT=require('jsonwebtoken');
const mongoose=require('mongoose');


const app=express();

app.post('/signup',async function())
