const express = require("express")

const app = express();

// to handle the request by using routes

app.use("/hello/2" ,(req,res)=>{
    res.send("hello hello bro 2 ...")
})

app.use("/hello" ,(req,res)=>{
    res.send("hello hello bro...")
})

app.use("/test" ,(req,res)=>{
    res.send("test from the server")
})

app.use("/" ,(req,res)=>{
    res.send("this is homepage")
})
//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})