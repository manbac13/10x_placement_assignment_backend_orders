const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/api_web_tech_assignment")

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId : {type:String, required:true},
    productType : {type:String,required:true},
    productName : {type:String,required:true},
    productPrice  : {type:Number,required:true},
    availableQuantity : {type:Number,required:true}
})

const product = new mongoose.model("product", productSchema);

module.exports = product
