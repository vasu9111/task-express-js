const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

// Function to generate random price with decimal
const generateRandomPrice = (min, max) => {
  const price = Math.random() * (max - min) + min;
  return parseFloat(price.toFixed(2)); // 2 decimal places
};

// Function to generate books
const generateBooks = (count) => {
  let books = [];
  for (let i = 0; i < count; i++) {
    books.push({
      id: uuidv4(),
      bookname: faker.lorem.words(3),
      price: generateRandomPrice(1000, 5000),
    });
  }
  return books;
};

module.exports = {
  generateBooks,
  generateRandomPrice,
};
