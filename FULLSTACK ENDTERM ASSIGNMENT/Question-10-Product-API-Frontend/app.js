// ## Question 10

// Establish an Express server to create an API for product data containing attributes such as id, name, price, and rating.
//  Utilize this API to construct a front end, showcasing all product 
// details and featuring a form for adding new products, implementing client- side rendering.

const express=require('express'),path=require('path'),app=express();app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
let products=[{id:1,name:'Laptop',price:55000,rating:4.6},{id:2,name:'Headphones',price:1999,rating:4.2}];let id=3;
app.get('/api/products',(req,res)=>res.json(products));app.post('/api/products',(req,res)=>{const {name,price,rating}=req.body;if(!name||price===undefined||rating===undefined)return res.status(400).json({error:'All fields are required'});const p={id:id++,name,price:Number(price),rating:Number(rating)};products.push(p);res.status(201).json(p)});
app.listen(3000,()=>console.log('Open http://localhost:3000'));
