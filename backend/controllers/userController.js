import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt"
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import { json } from "express";

export const regesterUser = expressAsyncHandler(async (req,res)=>{
    const {name , email,password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:"All fields are required"});
        return;
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400).json({message:"User already exists"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    console.log(user);

    res.status(201).json({message:"User registered successfully"});
})

export const loginUser = expressAsyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({message:"All fields are required"});
    }
    const user = await User.findOne({email});
    //compare password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                name:user.name,
                email:user.email,
                id:user._id,
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({message:"Login successful",accessToken});
    }else{
        res.status(401).json({message:"Unauthorized or invalid credentials"});
    }
   
})

export const getCurrentUser = expressAsyncHandler(async (req,res)=>{
    res.json(req.user);
})