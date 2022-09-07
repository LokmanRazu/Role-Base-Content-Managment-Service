const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.getSingleUser =async (req,res,next)=>{
     try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status:'SUCCESS',
            data:{
                user
            }
        });

     }catch(e){
        console.log(`I am from getSingleUser and Error is : ${e}`)
        next(e)
     };
};

exports.getAllUser =async (req,res,next)=>{
    try{
       const user = await User.find();
       res.status(200).json({
           status:'SUCCESS',
           data:{
               user
           }
       });

    }catch(e){
       console.log(`I am from getAllUser and Error is : ${e}`)
       next(e)
    };
};

exports.cerateUser =async (req,res,next)=>{
    const { name,email,password,resetOTPorToken,role } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,11)
        const user = new User({
            name,
            email,
            password:hashedPassword,
            resetOTPorToken,
            role
        })
        await user.save();

        

       res.status(200).json({
           status:'SUCCESS',
           data:{
               user
           }
       });

    }catch(e){
       console.log(`I am from getSingleUser and Error is : ${e}`)
       next(e)
    };
};

exports.updateUser = async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(req.params.id,req.body,{new:true})
    
        res.status(200).json({
            status:'SUCCESS',
            data:{
            updateUser
            }
        });
    
    
    }catch(e){
        console.log(`I am from UpdateUser and Error is : ${e}`)
        next(e)
      }  
    };
