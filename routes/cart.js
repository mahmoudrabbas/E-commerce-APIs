const router = require("express").Router();
const Cart = require("../models/Cart.js");
const {auth, isAdminAuth} = require("../middlewares/auth.js");


router.post("/", auth, async ( req, res ) => {
    const cart = new Cart({...req.body, userId: req.user.id});
    try {
        const createdCart = await cart.save();
        res.status(201).json(createdCart);
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
})

router.put("/:id", auth, async ( req, res ) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
})

router.get("/", isAdminAuth, async ( req, res ) => {
    try {
        const carts = await Cart.find({})
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.get("/find", auth, async ( req, res ) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})




module.exports = router;