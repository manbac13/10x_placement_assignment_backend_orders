const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")

const productRouter = require('./routes/productRoute')
const customerRouter = require('./routes/customerRoute')
const orderRouter = require("./routes/orderRoute")

const app = express()

//routes
app.use("/product", productRouter)
app.use("/customer", customerRouter)
app.use("/order", orderRouter)

app.get('/', (req,res)=>{
    res.send("Hello from app")
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})