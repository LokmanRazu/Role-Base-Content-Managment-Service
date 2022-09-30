const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");


exports.authentication = async (req, res, next) => {
  try {
    let token;
    //  CHECHING THE TOKEN.. IS IT IN THE req.headers.authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return res.status(403).json({
        mesage: "Invalid token",
      });
    }

    //  VERIFY TOKEN
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(`The DECODE DTAA IS  : ${decode}`);

    //  CHECKING USER
    const freshUser = await User.findById(decode.id);
    console.log(freshUser + ".......");
    req.user = freshUser;
    next();
  } catch (e) {
    console.log(`I am from User Authentication Middleware and Error is : ${e}`);
    next(e);
  }
};

exports.isAdmin = (roles=[]) => {
    return (req, res, next) => {
    const user = req.user 
    if (!user) {
      throw new Error("User Not Found");
    }
    let isPermission = roles.includes(user.role.value);
    console.log(isPermission)
    if(isPermission){
       return next()
    }
     throw new Error('You do not have permission to do ')

  };
};
