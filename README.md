# server

- REST APIs build with express.js

# Getting Started

- Node.js
- npm (Node Package Manager)
- Postman (for API testing)

# Install the required dependencies.

- npm i express

# Update the scripts section in package.json for development:

- "scripts": {
  "start": "node server.js",
  "dev":"node --watch server"
  }

# Running the Project

`npm run dev`

# start the server

- Run `http://localhost:3000/` in postman

# API Documentation :-

# Base URL :-

- `http://localhost:3000/`

# Endpoints :-

- 1.  Get Welcome Message:-
      Method: GET
      URL: '/'
      Returns a welcome message for the API.

- 2.  Get All Books :-
      Method: GET
      URL: '/api/book/all-books'
      Fetches all books from the database.

- 3.  Get a Single Book by ID :-
      Method: GET
      URL: '/api/book/:id'
      a specific book id to find single data.

- 4.  Filter and Paginate Books:-
      Method: POST
      URL: '/api/book/filter '
      pagination (page, limit), search (search), and price range (minprice, maxprice) in the request body to return a filtered list of books.

- 5.  Add a New Book :-
      Method: POST
      URL: '/api/book/add'
      Adds a new book using data provided in the request body.

- 6.  Update a Book by ID :-
      Method: PUT
      URL: '/api/book/:id'
      Updates the details of a book specified by its ID with new data provided in the request body.

- 7.  Delete a Book by ID :-
      Method: DELETE
      URL: '/api/book/:id'
      Deletes the book with the given ID.'
