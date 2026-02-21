// create env
require("dotenv").config()

//require express
const express = require("express")
//bcrypt
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")


//create server
const app = express()
app.use(express.json())

//creating db connection
async function dbconnection(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/electronicsApp")
        console.log("db connected")
    } catch (error) {
        console.log(error)
        
    }
}

dbconnection()

const User = require("./models/user")


//creating port
const port = process.env.PORT || 3000;

//routes

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
app.use("/api",userRoutes);
app.use("/api", productRoutes);

//////////////////////////////////////////product




// port listening
app.listen(port,()=>{
    console.log(`the server micro electronics is running at port${port}`)
})