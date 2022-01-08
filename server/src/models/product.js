
const Mongoose = require('mongoose');
const User = require('./user');

const productSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    offer:{
        type:Number
    },
    productPictures:[
        {img:{type:String}}
    ],
    reviews:{
        userId: {type:  Mongoose.Schema.Types.ObjectId, ref:'User'},
        review: {type:String}
    },
    category:{
            type:  Mongoose.Schema.Types.ObjectId, 
            ref:'Category' ,
            required:true
    },
    createdBy:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

module.exports = Mongoose.model('Product',productSchema)
