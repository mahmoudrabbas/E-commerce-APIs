const router = require("express").Router();
const Order = require("../models/Order.js");
const {auth, isAdminAuth} = require("../middlewares/auth.js");


router.post("/", auth, async ( req, res ) => {
    const order = new Order({...req.body, userId: req.user.id});
    try {
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
})

router.put("/:id", isAdminAuth, async ( req, res ) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error });
        
    }
})

router.get("/", isAdminAuth, async ( req, res ) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.get("/find", auth, async ( req, res ) => {
    try {
        const order = await Order.findOne({ userId: req.user.id })
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.get("/income", auth, async ( req, res ) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: { month: "$createdAt", sales: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$sales" } } }
        ]);
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})




module.exports = router;