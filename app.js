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
app.post("/register",async(req,res)=>{
    try {
        
        //get data
        const {username,email, password,role} = req.body;
        //validated data
        if(!username || !email || !password) return res.status(400).json({msg:"Missing Data"});
        // if exist user
        const existuser = await  User.findOne({email});
        if (existuser) return res.status(400).json({msg:"Account allready exist"});
        //create user
        const hashpassword = await bcrypt.hash(password, 10) //count of numer hashing

        const user = await User.create({
            username,
            email,
            password: hashpassword,
            role
        })
        //response
        res.status(201).json({
            msg: "Done Created User",
            data: user
        })

    } catch (error) {
        console.log(error);
    }
})





/////////login

app.post("/login",async(req,res)=>{
    try {
        //get data
        const {email,password} = req.body;
        //validation data
        if(!email||!password) return res.status(400).json({msg:"missing data"})
        //   
        
         const user = await  User.findOne({email});
        if (!user) return res.status(400).json({msg:"Account not exist"});
        const matchpassword = await bcrypt.compare(password, user.password) //count of numer hashing
        if (!matchpassword)
            return res.ststus(400).json({msg:"Invalid Passoword"});


        const authCode = Buffer.from(user._id.toString()).toString("base64");


        res.status(200).json({
            msg: "success login",
            data: authCode})
    } catch (error) {
        console.log(error)
    }
})

//////////////////////////////////////////product




// port listening
app.listen(port,()=>{
    console.log(`the server micro electronics is running at port${port}`)
})