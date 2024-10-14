import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // this means that the value must be unique or not duplicated within the entire collection
    },
    subscription: {
      type: String,
      // setting an enum means all the values set for this field must only come from the enum
      enum: ["starter", "pro", "business"], // enum is a data type which you can think of as a collection of relevant data
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const User = model("user", userSchema);

export { User };
