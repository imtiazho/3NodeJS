const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From server");
});

const users = [
  { id: 1, Name: "Imtiaz", Email: "imtiaz@gmail.com" },
  { id: 2, Name: "Imtiaz2", Email: "imtiaz2@gmail.com" },
  { id: 3, Name: "Imtiaz3", Email: "imtiaz3@gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log("User post method");
//   console.log(req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;

  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
