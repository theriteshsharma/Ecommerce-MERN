const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    userName:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'admin'
    },
    hash_password:{
        type:String,
        require:true,
    },
    contactNumber:{
        type:String

    },
    profilePicture:{
        type:String
    }


},{timestamps:true});

// userSchema.virtual('password')
// .set( function(password){
//     this.hash_password = bcrypt.hashSync(password,11);
// })


userSchema.methods = {
    authenticate: async function  (password){
        return await bcrypt.compare(password,this.hash_password);
    }
}
module.exports = mongoose.model('User',userSchema)