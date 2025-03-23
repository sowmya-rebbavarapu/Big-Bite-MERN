import foodModel from "../models/foodModel.js";
import fs from 'fs';
import mongoose from "mongoose";
// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ✅ Get a food item by ID (NEW FUNCTION)
const getFoodById = async (req, res) => {
   try {
      const { id } = req.params;

      // ✅ Check if `id` is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, message: "Invalid food ID format" });
      }

      const food = await foodModel.findById(id);
      if (!food) {
          return res.status(404).json({ success: false, message: "Food item not found" });
      }

      res.status(200).json({ success: true, data: food });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export { addFood, listFood, removeFood, getFoodById };
