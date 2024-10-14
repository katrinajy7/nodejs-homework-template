import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/usersModel.js";
import {
  signupValidation,
  subscriptionValidation,
} from "../validation/validation.js";

//NOTES
//1. validate request body using joi
//2. validate if email is unique
// 3. hash the password before saving it to the database
//4. save the user to the database

const { SECRET_KEY } = process.env;

// 1. validate through frontend validation using Joi
// 2. find an existing user to prevent a duplicate email signup
// 3. hash password
// 4. create user document and save it in the database
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupValidation.validate(req.body);

    //Registration validation error
    if (error) {
      return res.status(400).json({ message: "missing required email or password field" });
    }

    const existingUser = await User.findOne({ email });

    //Registration conflict error
    if (existingUser) {
      return res.status(409).json({ message: "Email in Use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);//salt 10

    const newUser = await User.create({ email, password: hashPassword });

    // res.status().json() is our way of resolving the HTTP request promise
    // without this, our HTTP request would go on forever
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.password,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//ANOTHER NOTES
//1. validate request body using joi
//2. validate if email is existing
//3. if email exists, we will compare or decrypt the hashedPassword to the password
//4. if decryption is not successful, send an error saying password is wrong
//4 if decryption is successful, we wil generate a token to the user
//5. the user will appy the token as authentication for all the future requests

// 1. validate through frontend validation using Joi
// 2. find an existing user because existing registered emails can only login
// 3. compare the user input password vs hashed password
// 4. if password is correct, generate JWT token
// 5. find the user in the database and add the token to the db document
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required email or password field" });
    }

    const user = await User.findOne({ email });
    
    //login user inexistent error
    if (!existingUser) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password);

    //login user password error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is wrong. Click forgot password to reset"    
      });
    }

    // _id is coming form MongoDB
    // id wil be for the JWT
    const payload = { id: exitingUser._id };
    // this generates a unique signature for our web token that only the person with the correct secret key can decode
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(existingUser._id, { token: token });

    res.status(200).json({
      token: token,
      user: {
        email: existingUser.email,
        // subscription: user.subscription,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 1. literally only validates the jwt
// 2. then once validated, logs out the user (this automatically strips the user of authentication rights)
const logoutUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "User successfully logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 1. literally only validates the jwt
// 2. then once validated, retrieves the data of the logged in user
const getCurrentUsers = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 1. validate through frontend validation using Joi
// 2. find an existing user because existing registered emails can only login
// 3. compare the user input password vs hashed password
// 4. if password is correct, generate JWT token
// 5. find the user in the database and add the token to the db document
const updateUserSubscription = async (req, res) => {
  try {
    const { error } = subscriptionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
};
