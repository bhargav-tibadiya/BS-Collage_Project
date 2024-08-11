const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Google Cloud Platform");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });

    const token = jwt.sign(
      { userId: userCreated._id.toString(), email: email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(201).json({ msg: userCreated, token });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Register the user" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      // Generate JWT Token
      const token = jwt.sign(
        { userId: userExist._id.toString(), email: userExist.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      // Set token in cookie
      res.cookie("token", token , {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
      });

      res.status(200).json({
        msg: "Login successful",
        user: {
          username: userExist.username,
          email: userExist.email,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async function (req, res) {
  res.cookie("token", " ");
  res.status(200).json({ msg: "Logged out successfully" });
};

module.exports = { home, register, login, logout };
