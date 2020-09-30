const express=require('express')
const cookie=require('cookie-parser')
const app=express()
let authRouter=require("./router/authRouter")
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json())
app.use("/api/",authRouter)
app.listen(4000,function(){
    console.log("Server is listening at port 4000")
})