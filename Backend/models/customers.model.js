import mongoose from "mongoose";
const customerSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
phoneNo:{
    type:Number,
    required:false,
    unique:true,
},
password:{
    type:String,
    required:true,
},
wishlist:{
    type:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
],
default:[]
},
cart:{
type:[
    {
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        },
        quantity:{
            type:Number,
            min:1,
            default:1,
        },
    },
   
],
 default:[]
}


})
const Customer=mongoose.model('customer',customerSchema);
export default Customer;