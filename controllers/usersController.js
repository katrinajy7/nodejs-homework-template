import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import "dotenv/config";
import { User } from "../models/usersModel.js";
import {
  signupValidation,
  subscriptionValidation,
} from "../validation/validation.js";
import { Jimp } from "jimp";
import path from "path";
import fs from "fs/promises";

const { SECRET_KEY } = process.env;

// 1. validate through frontend validation using Joi
// 2. find an existing user to prevent a duplicate email signup
// 3. hash password
// 4. create user document and save it in the database
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required email or password field" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in Use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // the url() function from the gravatar npm package sets the global avatar for the email associated with the account
    // accepts two parameters: first is the email, second is the object containing the http protocol
    // this avatar is temporary and placeholder only for when the user initially signs up
    const avatarURL = gravatar.url(email, { protocol: "http" });

    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
    });

    // res.status().json() is our way of resolving the HTTP request promise
    // without this, our HTTP request would go on forever
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
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
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupValidation.validate(req.body);
    if (error) {
      return res.status(401).json({ message: error.message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = { id: user._id };
    // this generates a unique signature for our web token that only the person with the correct secret key can decode
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
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

// 1. verify if the token is existing in the request
// 2. if the token is valid, access the uploaded avatar using the upload.js middleware
const updateAvatar = async (req, res) => {
  try {
    // access the authentication token through the req.user
    const { _id } = req.user;
    console.log("User ID:", _id); // Debug log

    // uploaded avatar is accessed through the req.file
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // request body is the request that supports this content type: application/json, text/html
    // request file is the request that supports this content type: Content-Type: image/jpeg, multipart/form-data
    const { path: oldPath, originalname } = req.file;
    console.log("File Path:", oldPath, "Original Filename:", originalname); // Debug log

    // we are reading the image from the temporary path
    // we are resizing the image to 250px width and 250px height
    // we are saving the updated resolution to the old temporary path
    await Jimp.read(oldPath)
      .then((image) => {
        console.log("Resizing image"); // Debug log
        image.resize({ w: 250, h: 250 }).write(oldPath);
        console.log("Image resized and saved to:", oldPath); // Debug log
      })
      .catch((error) => console.log(error));

    // Move the user's avatar from the tmp folder to the public/avatars folder and give it a unique name for the specific user
    // the unique file name that we will generate is a concatenated version of the id of the user document and the extension of the original image file.

    // 66e576387fdc812acc32be53.webp
    const extension = path.extname(originalname);
    const filename = `${_id}${extension}`;
    console.log("Generated Filename:", filename); // Debug log

    // call the file system rename path function
    const newPath = path.join("public", "avatars", filename);
    // public/avatars/66e576387fdc812acc32be53.jpeg
    await fs.rename(oldPath, newPath);

    // construct a new avatar URL
    // this may not work directly if you are using a windows OS
    const avatarURL = path.join("/avatars", filename);

    // you may try this for a windows ecosystem
    // let avatarURL = path.join("/avatars", filename);
    // avatarURL = avatarURL.replace(/\\/g, "/");

    // save the newly generated avatar in the database and the public folder
    await User.findByIdAndUpdate(_id, { avatarURL });
    console.log("Avatar URL saved to the database"); // Debug log

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error("Error in updateAvatar:", error); // Debug log
    res.status(500).json({ message: error.message });
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
  updateAvatar,
};
