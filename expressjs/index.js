import express from "express";

const app = express();

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("<h1>Hello world</h1><p>My name is Jaimin</p>");
});
