//HOMEWORK 3
import express from "express";
import logger from "morgan";
import cors from "cors";

import { router as contactsRouter } from "./routes/api/contactsRouter.js";
import { router as usersRouter } from "./routes/api/usersRouter.js";

// initialize an express application
const app = express();

// we will retrieve the environment variable using CROSS-ENV that is preinstalled with this boilerplate
// we are creating an instance of a logger function
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// we will apply the use function to implement a middleware
// pass the formatsLogger function to the MORGAN package using the logger function
// middleware is logger function coming from MORGAN
// we are passing formatsLogger as the value of our logger function
app.use(logger(formatsLogger));
app.use(cors());
// this is the JSON parser middleware
app.use(express.json());

// initialize the base path for the contacts router
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// error handling using res.status()
// not found
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// server error
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

// export the express application
// module.exports = app;
export { app };

// IMPORT MODULES
// IMPORT ENVIRONMENT VARIABLES
// IMPORT AND USE MIDDLEWARES
// INITIALIZE BASE PATH FOR ROUTER
// ADD ERROR HANDLING
// EXPORT MODULE




// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app





// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app

// const express = require ("express");
// const logger = require("morgan");
// const cors = require("cors");

// //SECOND CHANGE
// import express from "express";
// import logger from "morgan";
// import cors from "cors";

// // const contactsRouter = require("./routes/api/contacts")

// import { router as contactsRouter } from "./routes/api/contacts.js"

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app;

// // import express from "express";
// // import router from  "./userRouter.js";
// // import dotenv from "dotenv";
// // dotenv.config();

// // // express function is used to initialize an Express backend application
// // // we are creating an express application instance and assigning it to the app constant
// // const app = express();
// // const env = app.get("env");
// // console.log("This is environment", env);

// // // import the JSON parser middleware
// // // app.use(express.json());

// // // set userRouter as a default route for the application
// // app.use("/", router);

// // // add a route for homepage
// // // BROWSERS CAN ONLY SEND GET REQUESTS BY DEFAULT WHEN SENDING THEM VIA THE URL INPUT
// // // routes take two parameters
// // // the first parameter is the path where we want to navigate
// // // the second parameter is the callback function
// // // where we can specify what we want to do in that specific route

// // // the callback function for express routes take two parameters
// // // first is the request object
// // // second is the response object
// // // app.get("/", (req, res) => {
// // //   // send method is accessible from the response object
// // //   // this allows use to send data in the route
// // //   //
// // //   res.send("Hello World!");
// // // });

// // // takes two parameters
// // // first parameter is the port number
// // // second parameter is the callback function
// // // where we can indicate the code that will run once the server is successfully started
// // app.listen(3001, () => {
// //   console.log(`Server is running on port ${process.env.PORT}`);
// // });
