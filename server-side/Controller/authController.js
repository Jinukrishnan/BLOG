import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const {sign}=pkg;
import postSchema from "../models/post.model.js";
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

export async function addPost(req,res){
    try {
        const {id}=req.user;
        const {title,content,author}=req.body;
        if(!(title && content && author))
            return res.status(400).send("All inputs are required");
        const data=await postSchema.create({user_id:id,title,content,author});
        res.status(200).send("Post added successfully");
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getPosts(req,res){
    try {
        const {id}=req.user;
        const posts=await postSchema.find({user_id:id}).populate("user_id").select("-password");
        console.log(posts);
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deletePost(req,res){

 console.log(req.params.id);
 console.log(req.user.id);
 const{id} = req.params;
 try {
    const data=await postSchema.deleteOne({_id:id,user_id:req.user.id});
    res.status(200).send("Post deleted successfully");
 } catch (error) {
    res.status(500).send(error.message);
 }
 
 
}


export async function getMe(req,res) {
    try {
      console.log(req.user);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}