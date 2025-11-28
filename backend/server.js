
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './userModel.js';
import bcrypt from 'bcryptjs';

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017')
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));

app.post('/api/register', async(req,res)=>{
 const {name,email,password}=req.body;
 const exists=await User.findOne({email});
 if(exists) return res.status(400).json({msg:"User exists"});
 const hash=await bcrypt.hash(password,10);
 const user=await User.create({name,email,password:hash});
 res.json({msg:"Registered", user});
});

app.post('/api/login', async(req,res)=>{
 const {email,password}=req.body;
 const user=await User.findOne({email});
 if(!user) return res.status(400).json({msg:"No user"});
 const match=await bcrypt.compare(password,user.password);
 if(!match) return res.status(400).json({msg:"Wrong password"});
 res.json({msg:"Login success", user:{name:user.name,email:user.email}});
});

app.listen(5000,()=>console.log("Backend running 5000"));
