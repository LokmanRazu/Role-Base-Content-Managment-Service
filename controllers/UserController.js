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
        let user = await User.findOne({email: req.body.email});
        if(!user){
            throw new Error('User not found')
        }
        let { password } = req.body;
        password = bcrypt.hashSync(password,11);
         user.password=password
         await user.save()
        console.log(req.body, password)
        res.status(200).json({
            status:'SUCCESS',
            data:{
            user
            }
        });
    
    
    }catch(e){
        console.log(`I am from UpdateUser and Error is : ${e}`)
        next(e)
      }  
    };

    exports.deleteUser = async (req,res,next)=>{
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id);
    
            res.status(200).json({
                status:'SUCCESS',
                data:{
               deleteUser
                }
            })
    
        }catch(e){
            console.log(`I am from DeleteUser and Error is : ${e}`)
            next(e)
        }
    };
