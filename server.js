const express = require("express")
const dotenv = require("dotenv")
const cors =require("cors")
const connectDB = require("./config/db")
const User = require("./models/User")

const userRoutes= require("./routes/userRoutes")
const serviceRoutes = require("./routes/serviceRoutes")

connectDB()
dotenv.config()
const app=express()
const PORT=process.env.PORT|| 3001

app.use(cors())
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("Service Management System backend Running successfully")
})

app.listen(PORT,()=>{
    console.log(`server running in ${PORT}`)
})

app.use("/api/users",userRoutes)
app.use("/api/service",serviceRoutes)
