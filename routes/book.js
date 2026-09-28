const express = require('express');
const router = express.Router();
const {handleAlldbBooks,handleGetBookById,handleUpdateBookById,handleDeleteBookById,handleCreateNewBook} = require('../controllers/book.js')


router
    .route('/')
    // To get all the books in json format
    .get(handleAlldbBooks)
    // To add new Book to the dataBase
    .post(handleCreateNewBook)


router
    .route('/:id')
    // To get a particlar book details By ID
    .get(handleGetBookById)
    // To Update a existing book detail
    .patch(handleUpdateBookById)
    // Deleting a book by its ID
    .delete(handleDeleteBookById)


module.exports = router