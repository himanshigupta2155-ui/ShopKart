import jwt from"jsonwebtoken"
// import models from"../models/customers.model.js"
import Customer from "../models/customers.model.js"
const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
             return res.status(404).json({message:"No token found"})
        }
        const decoded=jwt.verify(token,process.env.jwt_secret)
        const customer=await Customer.findById(decoded.userId)
        if(!customer){
           return  res.status(404).json({message:"No customer found"});
        }
        req.customer=customer;
        next();
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
export default isAuthenticated