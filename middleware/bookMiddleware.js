const posts = require('../book/bookService');

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      return next();
    } catch (err) {
      const errors = err.details.map((detail) => detail.message);
      res.status(400).json({ errors: errors });
    }
  };
};

const idNotFound = (req, res, next) => {
  const id = req.params.id;
  const index = posts.getAllBooks().findIndex((book) => book.id === id);
  if (index === -1) {
    return res.status(400).json({ error: `book not found id ${id}` });
  }
  next();
};

module.exports = { validate, idNotFound };
