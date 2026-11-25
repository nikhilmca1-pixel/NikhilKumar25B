require('dotenv').config();const express=require('express'),mongoose=require('mongoose');const app=express();app.use(express.json());
const Product=mongoose.model('Product',new mongoose.Schema({name:{type:String,required:true},price:{type:Number,required:true,min:0},description:{type:String,required:true}},{timestamps:true}));
app.get('/products',async(req,res)=>res.json(await Product.find()));
app.get('/products/:id',async(req,res)=>{try{const p=await Product.findById(req.params.id);p?res.json(p):res.status(404).json({error:'Product not found'})}catch{res.status(400).json({error:'Invalid product id'})}});
app.post('/products',async(req,res)=>{try{const p=await Product.create(req.body);res.status(201).json(p)}catch(e){res.status(400).json({error:e.message})}});
app.put('/products/:id',async(req,res)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});p?res.json(p):res.status(404).json({error:'Product not found'})}catch(e){res.status(400).json({error:e.message})}});
app.delete('/products/:id',async(req,res)=>{try{const p=await Product.findByIdAndDelete(req.params.id);p?res.json({message:'Deleted'}):res.status(404).json({error:'Product not found'})}catch{res.status(400).json({error:'Invalid product id'})}});
const port=process.env.PORT||3000;mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/product_assignment').then(()=>app.listen(port,()=>console.log(`Connected to MongoDB. http://localhost:${port}/products`))).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
