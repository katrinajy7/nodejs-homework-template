// const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

// const app = require("./.git");
import { app } from "./app.js"
import mongoose from "mongoose";
import dotenv from "dotenv";


//initialize the environment variables
dotenv.config();
// access the environment variables

const { DB_HOST} = process.env;

mongoose.connect(DB_HOST, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
})
.then (() => {
  app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});

console.log("Database connect successful");
})
.catch((error) => {
  console.log(`Server not running. Error message: ${error.message}`);
  process.exit(1) // this terminates the mongoose connection
})