const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/api_web_tech_assignment")

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_id : {type:String, required:true},
    customer_name : {type:String, required : true},
    Email : {type: String, required : true, unique:true},
    balance: {type:String, required:true}
})

const customer = mongoose.model("customer", customerSchema);

module.exports = customer