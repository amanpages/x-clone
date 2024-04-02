const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// creating user schema
const userSchema = new mongoose.Schema(
  {
    // user's name
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [40, "Name cannot be greater than 40 Characters"],
    },
    // email address of user
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    // password
    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [8, "password cannot be less than 8 characters"],
      select: false,
    },
    dateOfBirth: {
      day: {
        type: String,
        required: [true, "Please enter day in date of birth"],
      },
      month: {
        type: String,
        required: [true, "Please enter month of your date of birth"],
      },
      year: {
        type: String,
        required: [true, "Please enter year of your date of birth"],
      },
    },
    photo: {
      // user's photo
      // photo id in cloudinary
      id: {
        type: String,
      },
      // url from cloudinary
      secure_url: {
        type: String,
      },
    },
    // list of people user follows
    follows: [
      {
        // user's id
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // list of people who are following this user
    followers: [
      {
        // user's id
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// to create bcrypt hash of password before saving in DB
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  // create hash for password
  this.password = await bcrypt.hash(this.password, 10);
});

// to check whether the password entered and password in DB match
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// exporting the schema's model
module.exports = mongoose.model("User", userSchema);
