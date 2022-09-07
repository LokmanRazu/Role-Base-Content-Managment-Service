const { timeStamp } = require('console')
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        minlength:4,
        required:true
    },
    reSetOTPorToken:String,
    role:{
        type:Schema.Types.ObjectId,
        ref:'Role'
    }

},{timestamps:true})

const User = model('User',userSchema);
module.exports = User;