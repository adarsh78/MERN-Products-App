import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;  // user will send data in body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Invalid product Id");
       return res.status(404).json({ success: false, message: "Invalid product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        console.log("Error in updating product: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export const deleteProduct = async (req, res) => {

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Invalid product Id");
        res.status(404).json({ success: false, message: "Invalid product Id"});
     }
 

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted Successfully"});
    } catch (error) {
        console.error("Error in deleting product: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}