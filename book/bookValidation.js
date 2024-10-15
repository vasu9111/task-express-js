const Joi = require('joi');

const bookSchema = Joi.object({
  bookname: Joi.string().trim().required(),
  price: Joi.number().required(),
});

const updateBookSchema = Joi.object({
  bookname: Joi.string().trim(),
  price: Joi.number(),
});

module.exports = {
  bookSchema,
  updateBookSchema,
};
