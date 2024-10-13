app.get("/contact", (req, res) => {
    res.send("<h1>Welcome to the Contacts Page</h1>");
  });
  
  // OPTIONAL SYMBOL FOR URL PATTERN (?)
  app.get("/lo?gin", (req, res) => {
    res.send("<h1>Welcome to the Login Page</h1>");
  });
  
  // CROSS SYMBOL FOR URL PATTERN (+)
  app.get("/logi+n", (req, res) => {
    res.send("<h1>Welcome to the Login Page</h1>");
  });
  
  // ASTERISK SYMBOL FOR URL PATTERN (*)
  app.get("/log*in", (req, res) => {
    res.send("<h1>Welcome to the Login Page with Randomized URL Path</h1>");
  });
  