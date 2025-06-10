import pkg from "jsonwebtoken";
const {verify}=pkg;
export default async function authMiddleware(req,res,next){
    const token=req.headers.authorization;
    if(!token)
        return res.status(401).send("Unauthorized access");
    const key=token.split(" ")[1];
    if(!key)
        return res.status(401).send("Unauthorized access");

    const data=await verify(key,process.env.JWT_KEY);
    console.log(data);
    
    if(!data)
        return res.status(401).send("Unauthorized access");
    req.user=data;
    next();
}