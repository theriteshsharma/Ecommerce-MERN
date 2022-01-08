const mongoose = require('mongoose');




const orderSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User',required:true,unique:true},
    orderItems:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:'Product',required:true},
        quantity:{type:Number,default:1},
        price:{type:Number,required:true},
        pincode:{type:String,required:true},
        address:{type:String,required:true},
        status:{type:String,required:true,default:'pending'}
    }]


},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema)