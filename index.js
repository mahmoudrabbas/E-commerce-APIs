const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require("./routes/auth.js");
dotenv.config();


app.use(express.json());
app.use("/api/auth", auth )



mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running on PORT " + process.env.PORT || 5000)
    } )
}).catch(err => {
    console.log("Database is failed to connect")
})






