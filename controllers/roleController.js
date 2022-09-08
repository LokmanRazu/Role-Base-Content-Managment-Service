const Role = require('../models/userRoleModels')

exports.getSingleRole = async (req,res,next)=>{
    try{
        const role = await Role.findById({id:req.params.id});
        res.status(200).json({
            status:'SUCCESS',
            data:{
                role
            }
        })

    }catch(e){
        console.log(`I am from GetSingleRole and Error is : ${e}`)
        next(e)
      } 

};

exports.getAllRole = async (req,res,next)=>{
    try{
        const role = await Role.find();
        res.status(200).json({
            status:'SUCCESS',
            data:{
                role
            }
        })

    }catch(e){
        console.log(`I am from GetAllRole and Error is : ${e}`)
        next(e)
      } 
}

exports.createRole = async (req,res,next)=>{
    try{
        const { title } = req.body
        const role = new Role({
            title
        })
        await role.save();

        res.status(200).json({
            status:'SUCCESS',
            data:{
                role
            }
        })

    }catch(e){
        console.log(`I am from CreateRole and Error is : ${e}`)
        next(e)
      } 
}

exports.deleteRole = async (req,res,next)=>{
    try{
        const role = await Role.findByIdAndDelete({id:req.params.id})
        res.status(200).json({
            status:'SUCCESS'
        })

    }catch(e){
        console.log(`I am from DeleteRole and Error is : ${e}`)
        next(e)
      } 
}



