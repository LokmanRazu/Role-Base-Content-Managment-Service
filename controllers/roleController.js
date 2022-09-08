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

