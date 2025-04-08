import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
// For __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Tell Express where the views folder is

app.get("/", (req, res) => {
  let data = {
    totalWords: 0,
  };
  res.render("index", data);
});

app.post("/submit", (req, res) => {
  let t = req.body;
  const { fName, lName } = t;
  let data = {
    totalWords: fName.length + lName.length,
  };
  res.render("index", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
