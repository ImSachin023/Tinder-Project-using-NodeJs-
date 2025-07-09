const express = require("express")

const app = express();

//this will handle only GET call of /user
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"Sachin",lastname:"Kumar"})
})
app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstname:"Sachin",lastname:"Kumar"})
})

// app.post("/user",(req,res)=>{
//     //save data to database
//     res.send("Data saved to database successfully")
// })

// app.patch("/user",(req,res)=>{
//     res.send("updation can done !!!!!")
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted Successfully")
// })
// //this will match all the HTTP method API calls to /test
// app.use("/test" ,(req,res)=>{
//     res.send("test from the server")
// })

//create a server 
app.listen("7777",()=>{
    console.log("the server can listen successfully")
})