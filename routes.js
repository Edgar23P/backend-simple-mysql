module.exports = app => {
    const todo = require("./todo.controller.js");
  
    // Create a new Customer
    app.post("/todo", todo.create);
  
    // Retrieve all todo
    app.get("/todo", todo.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/todo/:TodoId", todo.findOne);
  
    // Update a Customer with customerId
    app.put("/todo/:TodoId", todo.update);
  
    // Delete a Customer with customerId
    app.delete("/todo/:TodoId", todo.delete);
  
    // Create a new Customer
    app.delete("/todo", todo.deleteAll);
  };
  