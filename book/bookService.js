const { generateBooks } = require('./bookGenerator');
let posts = generateBooks(50);

// Service to get all books
exports.getAllBooks = () => posts;

// Service to get filtered books with pagination, search, and price filter
exports.getFilteredBooks = (page = 1, limit = 5, search = '', minPrice, maxPrice) => {
  let filteredBooks = posts;

  // Filter by search term
  if (search.trim()) {
    filteredBooks = filteredBooks.filter((book) =>
      book.bookname.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    filteredBooks = filteredBooks.filter(
      (book) => book.price >= (minPrice || 0) && book.price <= (maxPrice || Infinity)
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / limit);

  return {
    totalBooks,
    totalPages,
    currentPage: page,
    booksPerPage: limit,
    books: paginatedBooks,
  };
};

// Service to get a single book by ID
exports.getSingleBook = (id) => posts.find((book) => book.id === id);

// Service to add a new book
exports.addBook = (bookname, price) => {
  if (!bookname || !price) {
    return { error: 'Bookname and price are required.' };
  }
  // validation bookname
  if (!isNaN(bookname)) {
    return { error: 'Bookname must be a field string.' };
  }
  // validation price
  if (!price || isNaN(price)) {
    return { error: 'Price must be a field number.' };
  }
  const newBook = {
    id: require('uuid').v4(), // Generate random ID
    bookname,
    price: parseFloat(price),
  };

  posts.push(newBook);
  return newBook;
};

// Service to update a book
exports.updateBook = (id, bookname, price) => {
  const index = posts.findIndex((book) => book.id === id);

  if (index === -1) {
    return { error: `Book with id ${id} not found.` };
  }
  if (bookname) {
    posts[index].bookname = bookname;
  }
  if (price) {
    posts[index].price = parseFloat(price);
  }

  return posts[index];
};

// Service to delete a book
exports.deleteBook = (id) => {
  const index = posts.findIndex((book) => book.id === id);
  if (index === -1) {
    return { error: `Book with ID ${id} not found.` };
  }

  posts.splice(index, 1);
  return { msg: `Book with ID ${id} deleted.` };
};
