const mongoose = require('mongoose');


const product = new mongoose.Schema({
    title:{ type:String, unique: true, required:true },
    description:{ type:String, required:true },
    img: { type:String, required:true },
    categories: { type:Array },
    size: { type:String },
    color: { type:String },
    price: { type:Number, required:true },
}, { timestamps: true });

module.exports = mongoose.model("PRODUCT", product);