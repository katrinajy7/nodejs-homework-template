// DEFAULT EXPRESSJS MIDDLEWARE SYNTAX
app.get("/some-path", (req, res, next) => {
    res.send("this is some path");
  
    // calling the default expressjs middleware
    next();
  });
  