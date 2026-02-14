// create env
require("dotenv").config()

//require express
const express = require("express")
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

//creating port
const port = process.env.PORT ||3000

// port listening
app.listen(port,()=>{
    console.log(`the server micro electronics is running at port${port}`)
})