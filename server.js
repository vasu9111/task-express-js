const express = require('express');
const indexRoute = require('./indexRoute');

const app = express();

app.use(express.json()); // row data
app.use(express.urlencoded({ extended: false })); // body urlencoded

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Book Store</h1>');
});

app.use('/', indexRoute);
app.listen(3000, () => console.log(`Server is running on port 3000`));
