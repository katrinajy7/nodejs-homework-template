app.post("/user", (req, res) => {
    // access the request body using req.body
    const name = req.body.name;
    const email = req.body.email;
  
    // destructure
    // const { name, email } = req.body;
  
    res.send(`User created: ${name}, email: ${email}`);
  });
  