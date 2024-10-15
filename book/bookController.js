const bookService = require('./bookService');

// Get all books
exports.getAllBooks = (req, res) => {
  const books = bookService.getAllBooks();
  res.json(books);
};

// Get filtered books with pagination, search, price range
exports.getFilteredBooks = (req, res) => {
  const { page, limit, search, minPrice, maxPrice } = req.body;
  const filteredBooks = bookService.getFilteredBooks(page, limit, search, minPrice, maxPrice);
  res.json(filteredBooks);
};

// Get single book by ID
exports.getSingleBook = (req, res) => {
  const id = req.params.id;
  const book = bookService.getSingleBook(id);
  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }
  res.status(200).json(book);
};

// Add new book
exports.addBook = (req, res) => {
  const { bookname, price } = req.body;
  const newBook = bookService.addBook(bookname, price);
  if (newBook.error) {
    return res.status(400).json({ error: newBook.error });
  }
  res.status(200).json(newBook);
};

// Update book
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { bookname, price } = req.body;
  const updatedBook = bookService.updateBook(id, bookname, price);
  if (updatedBook.error) {
    return res.status(404).json({ error: updatedBook.error });
  }
  res.status(200).json(updatedBook);
};

// Delete book
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const deleted = bookService.deleteBook(id);
  if (deleted.error) {
    return res.status(404).json({ error: deleted.error });
  }
  res.status(200).json({ msg: deleted.msg });
};
