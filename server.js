const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json()); // row data
app.use(express.urlencoded({ extended: false })); // body uelncoded

app.get("/", (req, res) => {
  res.send("<h1>welcome to book store</h1>");
});
let posts = [
  { id: uuidv4(), bookname: "Bhagavad Gita", price: "1000" },
  { id: uuidv4(), bookname: "Mahabharata", price: "2000" },
  { id: uuidv4(), bookname: "Ramayana", price: "3000" },
];

//get all data
app.get("/book", (req, res) => {
  res.json(posts);
});

// get single data
app.get("/book/:id", (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post.id === id); //
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was not found` });
  } else {
    res.status(200).json(post);
  }
});

// data add (post)
app.post("/book", (req, res) => {
  const newpost = {
    id: uuidv4(), //rando id
    bookname: req.body.bookname,
    price: req.body.price,
  };
  posts.push(newpost);
  res.status(200).json(posts);
});

/// update data (put)

app.put("/book/:id", (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post.id === id);
  (post.id = uuidv4()), (post.bookname = req.body.bookname);
  post.price = req.body.price;
  res.status(200).json(posts);
});

// delete data (delete)

app.delete("/book/:id", (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post === id);
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was delete` });
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(post);
  }
});

app.listen(3000, () => console.log(`server is runing on port 3000`));
