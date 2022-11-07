const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")
const customer = require("../models/customerSchema")
const bodyparser = require("body-parser")

const router = express.Router();
router.use(bodyparser())

router.get("/", async (req, res) => {
    try {
        const data = await customer.find();
        res.status(200).json({
            status: "Success",
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})

router.get("/:customer_id", async(req,res)=>{
    try{
        const data = await customer.findOne({customer_id:req.params.customer_id})
        if(!data){
            return res.status(400).json({
                status:"Failed",
                message:"No customer found...check again"
            })
        }
        res.status(200).json({
            status:"Success",
            data
        })
    }
    catch(error){
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
    
})

router.post("/", async (req, res) => {
    try {
        let customerData = await customer.create(req.body)
        res.status(200).json({
            status: "Success",
            customerData
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})

module.exports = router