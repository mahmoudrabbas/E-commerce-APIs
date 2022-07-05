const router = require('express').Router();
const User = require('../models/User.js');
const {auth, isAdminAuth} = require("../middlewares/auth.js");


router.get("/stats", isAdminAuth, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } }
        ]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put("/:id", auth, async ( req, res ) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete("/:id", auth, async ( req, res ) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("this account has been deleted");
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.get("/:id", isAdminAuth, async ( req, res ) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if(!user) return res.status(404).json("user is not found")
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.get("/", isAdminAuth, async ( req, res ) => {
    try {
        const user = req.query? await User.find().sort({ createdAt: -1 }).limit(5) : await User.find({} , { password:0 });
        if(!user) return res.status(404).json("user is not found")
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})



module.exports = router;