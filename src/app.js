const express = require("express")

const app = express();

// const {AdminAuth,UserAuth} = require("./middlewares/auth")

// // this is the middleware
// app.use("/admin",AdminAuth)

// // this is for the admin to check the validation of the admin
// app.get("/admin/getAllUser",(req,res)=>{
//    res.send("Sent All Data")
// })
// app.get("/admin/deleteUser",(req,res)=>{
//    res.send("Delete a User")
// })

// // this is for the admin to check the validation of the User
// app.get("/user",UserAuth,(req,res)=>{
//    res.send("Sent All Data")
// })


app .get ("/getUserData",(req,res)=>{
    try {
        throw new Error("sabdjyhfdvwshgfkjag");
        res.send("user data send")
    }
    catch(err){
        res.status(500).send("something Error contact support team")
    }
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})
//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})