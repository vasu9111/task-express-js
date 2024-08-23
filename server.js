const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>welcome to book store</h1>");
});

let posts = [
  { id: 1, bookname: "Bhagavad Gita", price: "1000" },
  { id: 2, bookname: "Mahabharata", price: "2000" },
  { id: 3, bookname: "Ramayana", price: "3000" },
];
//get all data
app.get("/book", (req, res) => {
  res.json(posts);
});

// get single data
app.get("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id); //
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was not found` });
  } else {
    res.status(200).json(post);
  }
});

// data add (post)
app.use(express.json()); // row data
app.use(express.urlencoded({ extended: false })); // body uelncoded

app.post("/book", (req, res) => {
  const newpost = {
    id: posts.length + 1,
    bookname: req.body.bookname,
    price: req.body.price,
  };
  posts.push(newpost);
  res.status(200).json(posts);
});

/// update data (put)

app.put("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  post.bookname = req.body.bookname;
  post.price = req.body.price;
  res.status(200).json(posts);
});

// delete data (delete)

app.delete("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post === id);
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was delete` });
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(post);
  }
});

app.listen(3000, () => console.log(`server is runing on port 3000`));
