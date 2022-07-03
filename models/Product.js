const mongoose = require('mongoose');


const product = new mongoose.Schema({
    title:{ type:String, unique: true, required:true },
    description:{ type:String, required:true },
    img: { type:String, required:true },
    categories: { type:Array },
    size: { type:String },
    color: { type:String },
    prize: { type:Number, required:true },
    category: { type:String, required:true },
}, { timestamps: true });

module.exports = mongoose.model("PRODUCT", product);