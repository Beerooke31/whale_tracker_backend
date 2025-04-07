const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.get("/", (req, res) => {
  res.send("Welcome to the REST API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//GET request for all users (READ)
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  res.json(users);
});

//GET request for single user (READ)
app.get("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

//POST Request (Create a User)
app.post("/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
  };
  //Normally, you would save this user to a database
  res.status(201).json(newUser);
});

//PUT request (Update a User)
app.put("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

//DELETE request (Delete a User)
app.delete("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});
