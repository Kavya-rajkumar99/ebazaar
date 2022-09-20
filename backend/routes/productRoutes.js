import express from "express";
import Product from "../models/productModel.js";
const productRouter = express.Router()

productRouter.get("/",async (req,res)=>{
    const products = await Product.find({})
    res.send(products)
})

productRouter.get('/slug/:slug',async (req,res)=>{
    const {slug} = req.params;
    const result = await Product.findOne({slug:slug})
    console.log(result)
    if(result){
        res.send(result)
    }
    else{
        res.status(404).send({message:"Product Not Found"})
    }
})

productRouter.get('/:id',async (req,res)=>{
        const {id} = req.params;
        const result = await Product.findById(id)
        console.log(result)
        if(result){
            res.send(result)
        }
        else{
            res.status(404).send({message:"Product Not Found"})
        }
    })
export default productRouter