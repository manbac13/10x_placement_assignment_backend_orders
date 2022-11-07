const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")
const product = require("../models/productSchema")
const bodyparser = require("body-parser")

const router = express.Router();
router.use(bodyparser())

router.get("/", async(req,res)=>{
    try {
        const data = await product.find()
        res.status(200).json({
            status:"Success",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"Failed",
            message:error.message
        })
    }
})

router.get("/:productId", async(req,res)=>{
    try {
        const data = await product.findOne({productId:req.params.productId})
        if(!data){
            return res.status(400).json({
                status:"Failed",
                message:"wrong product ID"
            })
        }
        res.status(200).json({
            status:"Success",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"Failed",
            message:error.message
        })
    }
})


router.post("/", async(req,res)=>{
    try {
        const productData = await product.create(req.body);
        res.status(200).json({
            status:"Success",
            productData
        })
    } catch (error) {
        res.status(200).json({
            status:"Failed",
            message:error.message
        })
    }
})

module.exports = router