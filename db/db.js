const mongoose = require("mongoose");

var db = 'mongodb+srv://root:root123@cluster0.fuz20.mongodb.net/SEProject?retryWrites=true&w=majority';

mongoose.connect(db).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("Error : "+err);
});


var orders = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    Flowers:mongoose.Schema.Types.Array,
    Address:{type:String,required:true},
})


var Flowers = new mongoose.Schema({
    ID:String,
    Name:String,
    Cost:String,
    IMG:String
});


const order = mongoose.model('orders',orders);
const Flower = mongoose.model('Flowers',Flowers);


module.exports ={order,Flower};