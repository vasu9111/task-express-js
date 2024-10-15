const express = require('express');
const bookController = require('./bookController');
const router = express.Router();

router.get('/all-books', bookController.getAllBooks);
router.post('/all-books', bookController.getFilteredBooks);
router.get('/:id', bookController.getSingleBook);
router.post('/add', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
