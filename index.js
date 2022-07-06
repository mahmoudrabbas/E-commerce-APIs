const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const product = require("./routes/product.js");
const cart = require("./routes/cart.js");
const orders = require("./routes/order.js");
const payment = require("./routes/stripe.js");
dotenv.config();


app.use(cors());
app.use(express.json());
app.use("/api/auth", auth )
app.use("/api/users", user )
app.use("/api/products", product )
app.use("/api/cart", cart )
app.use("/api/orders", orders )
app.use("/api/check", payment )



mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on PORT " + process.env.PORT || 5000)
    } )
}).catch(err => {
    console.log("Database is failed to connect")
})






