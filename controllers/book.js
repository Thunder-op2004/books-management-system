const MyModel = require('../models/book.js')

async function handleAlldbBooks(req, res) {
    try {
        const books = await MyModel.find()
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function handleGetBookById(req, res) {
    try {
        const { id } = req.params
        const book = await MyModel.findById(id)
        if (!book) {
            return res.status(404).json({ message: 'No book found with that id' })
        }
        return res.status(200).json({ book: book })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        return res.status(500).json({ Error: error.message })
    }
}


async function handleUpdateBookById(req, res) {
    try {
        const { id } = req.params
        const updatedbook = await MyModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedbook) {
            return res.status(404).json({ message: 'No book found with that id' })
        }
        return res.status(200).json({ book: updatedbook })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        return res.status(500).json({ Error: error.message })
    }
}

async function handleDeleteBookById(req, res) {
    try {
        const { id } = req.params
        const book = await MyModel.findByIdAndDelete(id,{returnDocument: 'after'})
        if (!book) {
            return res.status(404).json({ message: 'No book found with that id' })
        }
        return res.status(200).json({ message: 'Success in deleting the book', book: book })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        return res.status(500).json({ Error: error.message })
    }
}

async function handleCreateNewBook(req, res) {
    try {
        const { title, author, genre, price, isAvailable } = req.body
        if (!title || !author || !genre || price === undefined || isAvailable === undefined) {
            return res.status(400).json({ message: 'All fields are required to create a book' })
        }
        const book = await MyModel.create(req.body)
        return res.status(201).json({ message: 'Create a new book', book: book, id: book._id })
    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
}


module.exports = {
    handleAlldbBooks,
    handleGetBookById,
    handleUpdateBookById,
    handleDeleteBookById,
    handleCreateNewBook
}