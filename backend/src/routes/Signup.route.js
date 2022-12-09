const express = require("express");
const userModel = require("../models/User.model");
const argon2 = require("argon2");
const signupRoute = express.Router();

signupRoute.post("/", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const validy = await userModel.find({ email: email });
    if(validy.length!==0){
       throw new Error()
    }
    const hash = await argon2.hash(password);
    const user = new userModel({ role, email, hash });
    await user.save();
    res.status(201).send("user created successfully");
  } catch (e) {
    
    res.status(400).send("email is already exist");
  }
});

module.exports = signupRoute;
