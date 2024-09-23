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
    price: faker.commerce.price({ min: 1000, max: 5000, dec: 2 }),
  });
}
//get all data
app.get('/books', (req, res) => {
  res.json(posts);
});

// post all data
app.post('/book/api', (req, res) => {
  let { page = 1, limit = 5, search = '', minPrice = '1000', maxPrice = '2000' } = req.body;

  // search by book name
  search = search.trim();
  let filteredPosts = posts;
  if (search) {
    filteredPosts = posts.filter((post) =>
      post.bookname.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);
    filteredPosts = filteredPosts.filter(
      (post) => post.price >= minPrice && post.price <= maxPrice
    );
  }
  // pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = filteredPosts.slice(startIndex, endIndex);

  const totalBook = filteredPosts.length;
  const totalPage = Math.ceil(totalBook / limit);

  res.json({
    totalBook,
    totalPage,
    currentPage: page,
    bookPerpage: limit,
    book: pagination,
  });
});

// get single data (GET)
app.get('/book/api/:id', (req, res) => {
  const id = req.params.id; //
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ msg: `A book id ${id} was not found` });
  } else {
    res.status(200).json(post);
  }
});

// data add (post)
app.post('/book/api/add', (req, res) => {
  const { bookname, price } = req.body;
  if (!bookname || !price) {
    return res.status(400).json({ msg: 'Bookname and price are required.' });
  }
  // validation bookname
  if (!isNaN(bookname)) {
    return res.status(400).json({ msg: 'Bookname must be a field string.' });
  }
  // validation price
  if (!price || isNaN(price)) {
    return res.status(400).json({ msg: 'Price must be a field number.' });
  }
  const newPost = {
    id: uuidv4(), // Generate random ID
    bookname,
    price: parseFloat(price),
  };

  posts.push(newPost);
  res.status(200).json(newPost);
});

// update data (put)

app.put('/book/api/:id', (req, res) => {
  const id = req.params.id; //
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ msg: `Book with id ${id} not found` });
  }
  posts[index].bookname = req.body.bookname || posts[index].bookname;
  posts[index].price = req.body.price || posts[index].price;
  res.status(200).json(posts[index]);
});

// delete data (delete)

app.delete('/book/api/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.findIndex((post) => post.id === id);
  if (post === -1) {
    return res.status(404).json({ msg: `Book with ID ${id} not found` });
  }
  posts.splice(post, 1);
  res.status(200).json({ msg: `Book with ID ${id} deleted` });
});

app.listen(3000, () => console.log(`server is runing on port 3000`));
