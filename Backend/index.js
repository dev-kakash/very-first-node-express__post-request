const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());
const port = "5000";

const posts = require("./posts");
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("listening from port ", port);
});

app.get("/posts", (req, res) => {
  const query = req.query.search;

  //>search="query" will be the value of query and it will be checked on the title of the post
  if (query) {
    const newPost = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    res.send(newPost);
  } else {
    res.send(posts);
  }
});


app.post("/posts", (req, res) => {
  const newPost = req.body;
  newPost.id = posts.length + 1;
  posts.push(newPost);
  res.json(newPost);
  console.log("triggers");
});
