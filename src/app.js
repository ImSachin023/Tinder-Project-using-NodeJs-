const express = require("express")

const app = express();

// to handle the request
app.use((req,res)=>{
    res.send("hello from the server")
})
// to handle the request by using routes
app.use("/" ,(req,res)=>{
    res.send("test from the server")
})
app.use("/test" ,(req,res)=>{
    res.send("test from the server")
})
app.use("/hello" ,(req,res)=>{
    res.send("hell hello bro...")
})
//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})