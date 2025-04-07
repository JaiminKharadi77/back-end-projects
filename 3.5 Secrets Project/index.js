//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000; // Define the port the server will listen on

let checkPassword = false;

// Middleware to parse form data submitted via POST and its IMPORTANT that we use it before bandNameGenterator
app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  let t = req?.body; // Extract form data from request body
  const { password } = t;
  checkPassword = password === "ILoveProgramming";
  next(); // Call next middleware or route handler
}

// Use the custom middleware for all incoming requests
app.use(passwordCheck);

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Route to serve the HTML form page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Send the form HTML file
});

// Route to handle form submission
app.post("/check", (req, res) => {
  if (checkPassword) return res.sendFile(__dirname + "/public/secret.html");
  res.sendFile(__dirname + "/public/index.html");
  //   res.redirect("/") <== We should  use this for best parctices
});
