const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../Models/admin.js");
const { log } = require("console");
const sendVerificationMail=require("../utils/sendVerificationMail.js")
const env = require("dotenv").config();

// const createToken = (_id) => {
//   const jwtSecretkey = process.env.JWT_SECRET_KEY;
//   console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

//   return jwt.sign({ _id }, jwtSecretkey, { expiresIn: "3d" });
// };

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(
    name,
    email,
    password,
    req.body
  );

  // Create a user with an email token for verification
  const user = new Admin({
    name,
    email,
    password,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });
  try {
    const newUser = await Admin.create({
      name: name,
      email: email,
      password: password,
      emailToken: user.emailToken,
    });

    sendVerificationMail.sendVerificationMail(user)
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;


    if (!emailToken) return res.status(404).json("email token is not found");
    const user = await Admin.findOne({ where: { emailToken } });
    console.log(user, "User found");
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      console.log(user.isVerified, "before saving");

      try {
        await user.save();
        console.log(user.isVerified, "after saving");

        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user?.isVerified,
        });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Failed to save user" });
      }
    } else {
      res.status(404).json("Email verification failed, invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
