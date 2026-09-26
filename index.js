const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config()

// Required Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Connecting to MongoDb Database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log('Error connecting to MongoDb', err))

app.use((req, res, next) => {
  fs.appendFile('log.txt', `\n${Date.now()}:${req.method} -> ${req.path}`, (err) => {
    if (err) {
      return res.json({ Error: 'Unable to append to the log file' })
    }
    next()
  })
})

// Definine the structure of my schema

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

// My model
const MyModel = mongoose.model('book', bookSchema);

// HomePage Response
app.get('/', (req, res) => {
  let html = `
  <h1>Welcome to the Book Store</h1>
  `
  res.send(html)
});


app
  .route('/api/books')
  // To get all the books in json format
  .get(async (req, res) => {
    try {
      const books = await MyModel.find()
      return res.status(200).json(books)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  })
  // To add new Book to the data
  .post(async (req, res) => {
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
  })


app
  .route('/api/books/:id')
  // To get a particlar book details By ID
  .get(async (req, res) => {
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
  })
  // To Update a existing book detail
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const book = await MyModel.findByIdAndDelete(id)
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
  })



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

