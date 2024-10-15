const express = require('express');
const bookRoute = require('./book/bookRoutes');
const router = express.Router();

router.use(express.json()); // row data
router.use(express.urlencoded({ extended: false })); // body urlencoded

router.use('/api/book', bookRoute);

module.exports = router;
