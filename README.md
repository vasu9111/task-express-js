# server

> REST APIs build with express.js

# Getting Started

- Node.js
- npm (Node Package Manager)
- Postman (for API testing)

# Install the required dependencies.

npm i express

# Update the scripts section in package.json for development:

"scripts": {
"start": "node server.js",
"dev":"node --watch server"
}

# Running the Project

`npm run dev`

# start the server

Run `http://localhost:3000/` in postman in postman

# API Documentation :-

# Base URL :-

`http://localhost:3000/`

# Endpoints :-

1. Get Welcome Message :- GET '/'

2. Get All Books :- GET '/book'

3. Get a Single Book by ID :- GET '/book/api/:id'

4. Get a Search by Name :-GET '/book/api/?search=bookname'

5. Get a Page & Limit :- GET '/book/api?page=1&limit=5'

6. Get a Min & Max Price:-GET'/book/api?minPrice=1000&maxPrice=2000'

7. Add a New Book :- POST '/book/api/'

8. Update a Book by ID :- PUT '/book/api/:id'

9. Delete a Book by ID :-DELETE '/book/api/:id'
