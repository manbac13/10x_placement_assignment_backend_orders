const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")
const customer = require("../models/customerSchema")
const product = require("../models/productSchema")
const order = require("../models/orderSchema")
const bodyparser = require("body-parser")

const router = express.Router();
router.use(bodyparser())

router.get("/", async(req, res) => {
    try {
        const data = await order.find()
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

router.post("/", async (req, res) => {
    try {
        const findCustomer = await customer.findOne({ customer_id: req.body.customer_id })
        const findProduct = await product.findOne({ productName: req.body.productName })
        console.log(findCustomer)
        console.log(findProduct)
        if(!findCustomer || !findProduct){
            return res.status(400).json({
                status:"Failed",
                message:"wrong data entered...check again your id or product name"
            })
        }
        const orderData = await order.create({
            customer_id:req.body.customer_id,
            productId : findProduct.productId,
            productName : findProduct.productName,
            quantity : req.body.quantity
        })

        
        let remainingQuantity = findProduct.availableQuantity - req.body.quantity
        console.log(remainingQuantity)
        if(remainingQuantity <= 0){
            return res.status(400).json({
                status:"Failed",
                message : 'Item out of Stock'
            })
        }
        let remainingBalance = findCustomer.balance - (req.body.quantity * findProduct.productPrice)
        console.log(remainingBalance)
        if(remainingBalance <= 0){
            return res.status(400).json({
                status:"Failed",
                message : 'Insufficient Balance'
            })
        }
        
        
        await findCustomer.updateOne({balance : remainingBalance})
        await findProduct.updateOne({availableQuantity: remainingQuantity})

        res.status(200).json({
            status:"Success",
            message:"Order Placed Successfully",
            orderData
        })

    } catch (error) {
        res.status(200).json({
            status:"Failed",
            message:error.message
        })
    }


})


module.exports = router