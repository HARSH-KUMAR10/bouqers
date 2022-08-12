const express = require("express");
const app = express();
const db = require('./db/db');
const PORT = process.env.PORT || 8001;
const fs = require('fs');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Views/index.html');
})

app.use(express.static(__dirname+'/Views'));

app.use(express.static(__dirname+'/assets'))

app.get('/addItems',(req,res)=>{
    const email = req.query.userEmail;
    const products = req.query.userOrder.split(',');
    const address = req.query.userAddress;
    db.order.collection.insertOne({
        Email:email,
        Flowers:products,
        Address:address,
        DateTime:new Date()
    },(err,result)=>{
        if(err){
            res.json({statusCode:400,message:'Error Occured',data:err});
        }else{
            res.json({statusCode:200,message:'Data Entered successfully',data:result});
        }
    })
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+'/Views/admin.html');
});

app.get('/orders',async (req,res)=>{
    var result = await db.order.find({});
    res.json({"orderes":result});
});

app.get('/flower',async(req,res)=>{
    var flower = await fs.readFileSync('./Models/flowers.json');
    flower = JSON.parse(flower);
    res.json({"flower":flower});
})

app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
})