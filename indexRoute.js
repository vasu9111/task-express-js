const express = require('express');
const bookRoute = require('./book/bookRoutes');
const router = express.Router();

router.use(express.json()); // row data
router.use(express.urlencoded({ extended: false })); // body urlencoded

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Book Store</h1>');
});

router.use('/api/book', bookRoute);

module.exports = router;
