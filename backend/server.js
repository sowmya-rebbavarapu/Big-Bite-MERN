import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter  from "./routes/orderRoute.js"
import dotenv from "dotenv";

dotenv.config()

//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend URL (if deployed, use that URL)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allows authentication headers & cookies
}));

//db connection
connectDB();

//api end points
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
