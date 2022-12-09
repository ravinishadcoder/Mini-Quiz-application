const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const express = require("express");
const userModel = require("../models/User.model");

const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // console.log(user.hash,password)
    const validity = await argon2.verify(user.hash, password);
    // console.log(validity)
    if (user && validity) {
      let token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        "SECRET1234"
      );

      res
        .status(200)
        .send({ massage: "login successfull", role: user.role, token: token });
    }
  } catch (e) {
    res.status(401).send("Unathourized");
  }
});

module.exports = loginRoute;
