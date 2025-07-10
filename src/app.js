const express = require("express")

const app = express();

//this will handle only GET call of /user
app.get("/user",(req,res,next)=>{
    console.log(req.params)
    next();
    // res.send({firstname:"Sachin",lastname:"Kumar"})
},(req,res,next)=>{
    console.log(req.params)
    // res.send({firstname:"Sachin2",lastname:"Kumar2"})
    next()
},
(req,res,next)=>{
    console.log(req.params)
    // res.send({firstname:"Sachin3",lastname:"Kumar3"})
    next()
},(req,res,next)=>{
    console.log(req.params)
    // res.send({firstname:"Sachin4",lastname:"Kumar4"})
    next()
},(req,res,next)=>{
    console.log(req.params)
    res.send({firstname:"Sachin5",lastname:"Kumar5"})
})


//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})