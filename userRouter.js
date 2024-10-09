import express from "express";

// create instance of the express Router
// Router is a class under Express
const router = express.Router();

// Define a route for getting user information
// router.get("/profile", (req, res) => {
//   res.send("User Profile Page");
// });

// // Define a route for updating user information
// router.put("/profile", (req, res) => {
//   res.send("Update User Profile");
// });

// // Define a route for deleting a user
// router.delete("/profile", (req, res) => {
//   res.send("Delete User Profile");
// });

router.all("/profile", (req, res, next) => {
  res.send(
    `[${process.env.NODE_ENV.toUpperCase()}] ${req.method} request made to ${
      req.originalUrl
    }`
  );
  next(); // Pass control to the next handler
});

export default router;
