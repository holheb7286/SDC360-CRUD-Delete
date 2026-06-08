const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');

// Get all Books
bookRoute.route('/').get((req, res) => {
  Book.find().then((response) => {
    res.status(200).json(response);
  })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
    })
})

module.exports = bookRoute;

// Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body).then(() => {
    console.log('Book added successfully.');
    res.status(200);
  })
    .catch((error) => {
      console.error(`Could not save book: ${error}`);
    })
})

// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not delete book: ${error}`);
      res.status(500).json(error);
    });
});

module.exports = bookRoute;