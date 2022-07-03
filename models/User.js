const mongoose = require('mongoose');


const user = new mongoose.Schema({
    username:{ type:String, unique: true, required:true },
    email:{ type:String, unique: true, required:true },
    password: { type:String, required:true },
    isAdmin: { type:Boolean, default:false }
}, { timestamps: true });

module.exports = mongoose.model("USER", user);