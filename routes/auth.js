const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const User = require("../models/User.js");


dotenv.config();

router.post("/signup", async ( req, res ) => {
    const {username, email, password } = req.body;
    try {
        const existingEmail = await User.findOne({ email });
        if(existingEmail) return res.status(400).json({ message: "Email already exists" });
        const existingUsername = await User.findOne({ username });
        if(existingUsername) return res.status(400).json({ message: "Username already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
})

router.post("/signin", async ( req, res ) => {
    const {username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ message: "Invalid username or password" });
        IsPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!IsPasswordCorrect) return res.status(404).json({ message: "Invalid username or password" });
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SEC_KEY, { expiresIn: "7d" })
        res.status(200).json({ ...user._doc, token })
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
})

module.exports = router;