//for creating schema tables
const mongoose=require('mongoose')
const custSchema =new mongoose.Schema({
    custname:String,
    custNumber:{
        type:Number,
        unique:true,
        required:true},
    city:String,
    state:String,
    pincode:Number
})
const CustModel=mongoose.model('customers',custSchema)
module.exports=CustModel