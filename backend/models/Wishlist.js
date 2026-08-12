import mongoose from "mongoose";
import Product from "./Product.js";
const wishlistSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[
        {
            Product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ]
},
{timestamps:true})
export default mongoose.model("Wishlist",wishlistSchema)