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

2. Get All Books :- GET '/books'

3. Get a Single Book by ID :- GET '/book/api/:id'

4. post page,limit,search,minprice,maxprice :- POST '/book/api'

5. Add a New Book :- POST '/book/api/add'

6. Update a Book by ID :- PUT '/book/api/:id'

7. Delete a Book by ID :-DELETE '/book/api/:id'
