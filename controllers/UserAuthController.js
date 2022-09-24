const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/email");
const crypto = require("crypto");

exports.userLogIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(403).json({
        message: "Invalid Email",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(403).json({
        mesage: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });

    res.status(200).json({
      status: "SUCCESS",
      data: {
        token,
      },
    });
  } catch (e) {
    console.log(`I am from UserLogIn and Error is : ${e}`);
    next(e);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next();
    }

    const resetToken = user.CreatePasswordResetToken();
    console.log(`resettoken isss ${resetToken}`);
    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `forgot Your Password? submit a patch request with your new pasword: ${resetURL}.
    If you did not forget your password,Please Ignore thios email`;

    try {
      await sendMail({
        email: user.email,
        subject: "Your password reset Token",
        message,
      });
      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (e) {
      user.PasswordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return next(e);
    }
  } catch (e) {
    console.log(`I am from Forget Password and Error is : ${e}`);
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log("hashedToken: ", hashedToken);
    const user = await User.findOne({
      PasswordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log("user :", user);
    if (!user) return next();
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    const newUser = await user.save();
    console.log("newuser :", newUser);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log("token: ", token);
    res.status(200).json({
      status: "sucsess",
      data: {
        token,
      }
    });
  } catch (e) {
    console.log(`I am from Reset Password and Error is : ${e}`);
    next(e);
  }
};
