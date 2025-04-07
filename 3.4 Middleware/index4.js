// Import required modules
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES Modules (since __dirname is not available by default)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize express app
const app = express();
const port = 3000; // Define the port the server will listen on

let bandName = ""; // Variable to store the generated band name

// Middleware to parse form data submitted via POST and its IMPORTANT that we use it before bandNameGenterator
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware to generate band name from form input
function bandNameGenerator(req, res, next) {
  let t = req?.body; // Extract form data from request body
  bandName = t?.street + t?.pet; // Concatenate street and pet names to form band name
  next(); // Call next middleware or route handler
}

// Use the custom middleware for all incoming requests
app.use(bandNameGenerator);

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Route to serve the HTML form page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Send the form HTML file
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  // Respond with the generated band name
  res.send(`<h1>Your Band Name is </h1><p>${bandName}</p>`);
});
