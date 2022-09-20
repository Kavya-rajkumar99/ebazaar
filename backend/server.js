import express from "express";
import { data } from "./data.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config()
const app = express();

app.use('/api/seed',seedRouter)
app.use('/api/products',productRouter)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to mongodb")
}).catch((err)=>console.log(err.message))

// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })

// app.get('/api/products/slug/:slug',(req,res)=>{
//     const {slug} = req.params;
//     const result = data.products.find(product=>product.slug===slug)
//     console.log(result)
//     if(result){
//         res.send(result)
//     }
//     else{
//         res.status(404).send({message:"Product Not Found"})
//     }
// })
// app.get('/api/products/:id',(req,res)=>{
//     const {id} = req.params;
//     const result = data.products.find(product=>product._id===id)
//     console.log(result)
//     if(result){
//         res.send(result)
//     }
//     else{
//         res.status(404).send({message:"Product Not Found"})
//     }
// })
const port = process.env.PORT || 5000;
app.listen(port,()=>{console.log(`Server started in port ${port}`)})