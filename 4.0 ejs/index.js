import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const dates = new Date("2025-04-06");
const day = dates.getDay();
let text = "Hey It's a weekday,it's time to work hard!";
app.use(bodyParser.urlencoded({ extended: true }));

function textGenerator(req, res, next) {
  if (day == 0 || day == 6) {
    text = "Hey it weekend,it's time to have fun!";
  }
  next();
}

app.use(textGenerator);

// For __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Tell Express where the views folder is

// Routes
app.get("/", (req, res) => {
  res.render("index", { name: text });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
