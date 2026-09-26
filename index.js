const express = require('express');
const app = express();
const port = 3000;
const books = require('./books.json')
const fs = require('fs');

// Required Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use((req, res, next) => {
  fs.appendFile('log.txt', `\n${Date.now()}:${req.method} -> ${req.path}`, (err) => {
    if (err) {
      return res.json({ Error: 'Unable to append to the log file' })
    }
    next()
  })
})

// Function to auto create new id for books
function getNewId(books) {
  if (books.length === 0) {
    return 1
  }
  let maxId = books[0].id

  for (let i = 1; i < books.length; i++) {
    if (books[i].id > maxId) {
      maxId = books[i].id
    }
  }
  return maxId + 1
}

// HomePage Response
app.get('/', (req, res) => {
  let html = `
  <h1>Welcome to the Book Store</h1>
  `
  res.send(html)
});


// To get All the names of the book
app.get('/books', (req, res) => {
  let html = `
  <ul>
  ${books.map((book) => `<li>${book.title}</li>`).join("")}
  </ul>
  `
  res.send(html)
});

// To get the Books in Json format / Sort by Genre 
app.get('/api/books', (req, res) => {
  const genre = (req.query.genre)
  if (genre) {
    const filterredbygenre = books.filter((book) => {
      return book.genre === genre
    })
    return res.json(filterredbygenre)
  }
  return res.json(books)
})


app
  .route('/api/books/:id')
  // To get a particlar book details By ID
  .get((req, res) => {
    const id = Number(req.params.id)
    let book = books.find((book) => {
      return book.id === id
    })
    if (!book) {
      return res.status(404).json({ status: 'Error', message: 'Book not found' })
    }
    return res.status(200).json({ book: book })
  })
  // To Update a existing book detail
  .patch((req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    let book = books.find((book) => {
      return book.id === id
    })
    if (!book) {
      return res.status(404).json({ status: 'Error', message: 'No such book with that id found' })
    }
    book = Object.assign(book, body)
    fs.writeFile('./books.json', JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.json({ err: 'Unable to update the existing data', message: err.message })
      }
      return res.status(200).json({ status: 'Success', book: book })
    })
  })
  .delete((req, res) => {
    const id = Number(req.params.id)
    const book = books.find((book) => {
      return book.id === id
    })
    if (!book) {
      return res.status(404).json({ status: 'Error', message: 'No such book with that id is found' })
    }
    const updatedlist = books.filter(obj => obj.id !== id)
    books.length = 0
    books.push(...updatedlist)
    fs.writeFile('./books.json', JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.json({ status: 'Error', message: err.message })
      }
      return res.status(200).json({ status: 'Success', books: books })
    })
  })


// To add new Book to the data
app.post('/api/books', (req, res) => {
  const body = req.body
  const newid = getNewId(books)
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ message: 'All Fields are required' })
  }
  books.push({ ...body, id: newid })
  fs.writeFile('./books.json', JSON.stringify(books, null, 2), (err, data) => {
    if (err) {
      return res.json({ status: 'Error', message: err.message })
    }
    return res.status(201).json({ status: 'Success', newid })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

