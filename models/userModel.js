const { model, Schema } = require("mongoose");
const role = require("./userRoleModels");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    resetOTPorToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    role: {
      type: Schema.Types.ObjectId,
      ref: role,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function () {
  this.populate({
    path: "role",
    select: "title",
  });
});

userSchema.methods.CreatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetOTPorToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 10 * 1000;

  return resetToken;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
});

const User = model("User", userSchema);
module.exports = User;
