// Routes that support URL parameters
app.get("/contacts", (req, res) => {
    res.send("<h1> Contacts Home Page </h1>");
  });
  
  app.get("/contacts/:contactId", (req, res) => {
    // we access URL parameters from req.params
    const contactId = req.params.contactId; // this is how we access the URL parameters
  
    res.send(`<h1> Individual Contact Page for contact ${contactId} </h1>`);
  });
  
  // Routes that support Query Parameters
  app.get("/phonebook", (req, res) => {
    // we access query parameters from req.query
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 0;
  
    // destructure
    //   const { skip, limit } = req.query;
  
    res.send(`<h1>Phonebook</h1> Skip: ${skip}, Limit: ${limit}`);
  });
  