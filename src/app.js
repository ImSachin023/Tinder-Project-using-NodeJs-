const express = require("express")

const app = express();

const {AdminAuth,UserAuth} = require("./middlewares/auth")

// this is the middleware
app.use("/admin",AdminAuth)

// this is for the admin to check the validation of the admin
app.get("/admin/getAllUser",(req,res)=>{
   res.send("Sent All Data")
})
app.get("/admin/deleteUser",(req,res)=>{
   res.send("Delete a User")
})

// this is for the admin to check the validation of the User
app.get("/user",UserAuth,(req,res)=>{
   res.send("Sent All Data")
})


//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})