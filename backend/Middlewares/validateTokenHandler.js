import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({message:"Unauthorized"});
                return;
            }
           console.log(decoded);
           req.user = decoded.user;
           next();
        })
        if(!token){
            res.status(401).json({message:"Unauthorized or token is missing"});
            return;
        }
    }else{
        res.status(401).json({message:"Unauthorized or token is missing"});
        return;
    }
})

export default validateToken;