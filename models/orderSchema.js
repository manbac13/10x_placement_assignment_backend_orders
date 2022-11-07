const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_id : {type:String, required:true},
    productId : {type:String,required:true},
    productName : {type:String,required:true},
    quantity : {type:Number, required:true}
})

const order = new mongoose.model("order", orderSchema);

module.exports = order