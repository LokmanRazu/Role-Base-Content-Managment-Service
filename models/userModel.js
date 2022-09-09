
const { model, Schema } = require('mongoose')
const role = require('./userRoleModels')

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
    resetOTPorToken:String,
    role:{
        type:Schema.Types.ObjectId,
        ref:role,
        required:true
    }

},{timestamps:true})

userSchema.pre(/^find/, function(){
    this.populate({
        path:'role',
        select:'title'
    })
})

const User = model('User',userSchema);
module.exports = User;