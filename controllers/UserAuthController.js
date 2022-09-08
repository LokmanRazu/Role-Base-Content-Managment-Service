const User = require('../models/userModel');
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.userLogIn = async (req,res,next)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne( { email })
        console.log(user)
        if(!user){
            return res.status(403).json({
                message:'Invalid Email'
            });
        };
        const matchPassword = await bcrypt.compare(password,user.password);
    
        if(!matchPassword){
            return res.status(403).json({
                mesage:'Invalid password'
            })
        }

        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN  })

        res.status(200).json({
            status:'SUCCESS',
            data:{
                token
            }
        })


    }catch(e){
        console.log(`I am from UserLogIn and Error is : ${e}`)
        next(e)
    }
}