import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const {sign}=pkg;

export async function register(req,res){
   try {
     const {email,password,cpassword}=req.body;
    if(!(email && password&&cpassword))
        return res.status(400).send("All inputs are required");
    
    if(password!==cpassword)
        return res.status(400).send("Password doesn't match");
    
    const user=await userSchema.findOne({email});
    if(user)
        return res.status(400).send("User already exist");
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=await userSchema.create({email,password:hashPassword});
   
    res.status(200).send("User registered successfully");
   } catch (error) {
    res.status(500).send(error.message);
   }
    
    
}

export  async function login(req,res){
    try {
        const {email,password}=req.body;
        if(!(email && password))
            return res.status(400).send("All inputs are required");
        const user=await userSchema.findOne({email});
        if(!user)
            return res.status(400).send("User doesn't exist");
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).send("Invalid credentials");
        const token=await sign({id:user._id},process.env.JWT_KEY,{expiresIn:"1d"});
        res.status(200).send({msg:"Login successful",token});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUsers(req,res){
    try {
        console.log(req.user);
        const {id}=req.user;
        const user=await userSchema.findById(id).select("-password");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}