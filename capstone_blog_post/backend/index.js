import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to handle JSON body

let post = [];

// Get all posts
app.get("/", (req, res) => {
  res.json({ post });
});

// Add a post
app.post("/add", (req, res) => {
  const { title, desc } = req.body;
  const newPost = {
    id: post.length > 0 ? post[post.length - 1].id + 1 : 1,
    title,
    desc,
  };
  post.push(newPost);
  res.json({ message: "Post added", post: newPost });
});

// Edit a post by ID
app.put("/edit", (req, res) => {
  const { title, desc, id } = req.body;
  const index = post.findIndex((p) => p.id == Number(id));
  if (index !== -1) {
    post[index] = { ...post[index], title, desc };
    res.json({ message: "Post updated" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete a post by ID
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  const index = post.findIndex((p) => p.id == Number(id));

  if (index !== -1) {
    post.splice(index, 1);
    res.json({ message: "Post deleted" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
