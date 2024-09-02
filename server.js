const express = require('express');
const { v4: uuidv4 } = require('uuid'); // uuid
const { faker } = require('@faker-js/faker'); //faker-js

const app = express();

app.use(express.json()); // row data
app.use(express.urlencoded({ extended: false })); // body uelncoded

app.get('/', (req, res) => {
  res.send('<h1>welcome to book store</h1>');
});

// genrate 50 random book
let posts = [];
for (let i = 0; i < 50; i++) {
  posts.push({
    id: uuidv4(),
    bookname: faker.lorem.words(3),
    price: faker.commerce.price({ min: 1000, max: 5000, dec: 2, symbol: '₹' }),
  });
}
app.get('/book', (req, res) => {
  res.json(posts);
});
// get all data
app.get('/book/api', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search?.toLowerCase();
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;

  // search by book name
  let filteredPosts = posts;
  if (search) {
    filteredPosts = posts.filter((post) => post.bookname.toLowerCase().includes(search));
  }

  // Filter by price range
  filteredPosts = filteredPosts.filter((post) => {
    const price = parseFloat(post.price.replace('₹', ''));
    return price >= minPrice && price <= maxPrice;
  });

  // pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = filteredPosts.slice(startIndex, endIndex);

  const totalbook = filteredPosts.length;
  const totalpage = Math.ceil(totalbook / limit);

  res.json({
    totalbook,
    totalpage,
    currentpage: page,
    bookperpage: limit,
    book: pagination,
  });
});

// get single data
app.get('/book/api/:id', (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post.id === id); //
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was not found` });
  } else {
    res.status(200).json(post);
  }
});

// data add (post)
app.post('/book/api', (req, res) => {
  const newpost = {
    id: uuidv4(), //random id
    bookname: req.body.bookname,
    price: req.body.price,
  };
  posts.push(newpost);
  res.status(200).json(posts);
});

/// update data (put)

app.put('/book/api/:id', (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post.id === id);
  (post.id = uuidv4()), (post.bookname = req.body.bookname);
  post.price = req.body.price;
  res.status(200).json(posts);
});

// delete data (delete)

app.delete('/book/api/:id', (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post === id);
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was delete` });
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(post);
  }
});

app.listen(3000, () => console.log(`server is runing on port 3000`));
