
const router = require("express").Router();
const { isAdminAuth } = require('../middlewares/auth.js');
const Product = require('../models/Product.js');

router.post("/", isAdminAuth, async ( req, res ) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error});        
    }
})

router.put("/:id", isAdminAuth, async ( req, res ) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true })
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({ message: error});        
    }
})

router.get("/", async( req,res ) => {
    const newQ = req.query.new;
    const categoryQ = req.query.category;
    try {
        let products;
        if(newQ){
            products = await Product.find({}).sort({ createdAt: -1 }).limit(1);
        }else if(categoryQ){
            products = await Product.find({ categories: { $in: [ categoryQ ] } })
        }else {
            products = await Product.find({})
        }
        if(!products) return res.status(404).json({ message: "there is no product" });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})



router.get("/:id", async( req,res ) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: "product is not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})



module.exports = router