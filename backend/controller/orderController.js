import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async (req, res) => {
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save(); // Store order in MongoDB
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
};


///user orders for frontend
const userOrders=async(req,res)=>{
     try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
     }
}

//listing orders for admin panel
const listOrders=async(req,res)=>{
        try {
            const orders=await orderModel.find({});
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}
//api for updating order status
const updateStatus=async (req,res)=>{
 try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status updated"})
 } catch (error) {
    console.log(error);
    res.json({success:"false",message:"error"})
 }
}
export { placeOrder,userOrders,listOrders,updateStatus};
