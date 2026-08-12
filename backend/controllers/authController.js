import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}
 const signup=async(req,res)=>{
    try {
     const{name,email,password}  =req.body
     const userExists= await  User.findOne({email})
     if(userExists){
        return res.status(400).json({message:"Email already register"})
     }
     const hashedPassword= await bcrypt.hash(password,10)
     const user=await User.create({
        name,
        email,
        password:hashedPassword
     })
     res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id)
     })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
 }

 const login=async(req,res)=>{
    try {
      const{email,password}=req.body  
      const user=await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"Incorrect email or password"})
      }
      const isMatch=await bcrypt.compare(password, user.password)
      if(!isMatch){
        return res.status(400).json({message:"Incorrect email or password"})
      }
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id)
      })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
 }
 export{signup,login}