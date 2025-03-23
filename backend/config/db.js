import mongoose from "mongoose";

 export const connectDB=async()=>{
     await mongoose.connect('mongodb+srv://sowmyarebbavarapu:sowmya12@cluster0.id9uk.mongodb.net/foodapp').then(()=>console.log("DB Connected"));
}
