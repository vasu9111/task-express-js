const express = require('express');
const bookController = require('./bookController');
const { validate, idNotFound } = require('../middleware/bookMiddleware');

const { bookSchema, updateBookSchema } = require('./bookValidation');
const router = express.Router();

router.get('/all-books', bookController.getAllBooks);
router.post('/filter', bookController.getFilteredBooks);
router.get('/:id', idNotFound, bookController.getSingleBook);
router.post('/add', validate(bookSchema), bookController.addBook);
router.put('/:id', idNotFound, validate(updateBookSchema), bookController.updateBook);
router.delete('/:id', idNotFound, bookController.deleteBook);

module.exports = router;
