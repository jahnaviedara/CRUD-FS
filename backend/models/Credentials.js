const mongoose=require('mongoose')
const CredSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const CredModel=mongoose.model('credentials',CredSchema)
module.exports=CredModel;