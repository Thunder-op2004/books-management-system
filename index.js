const express = require('express');
const app = express();
const port = 3000;
const books = require('./books.json')

app.use(express.json());


app.get('/', (req, res) => {
  let html = `
  <h1>Welcome to the Book Store</h1>
  `
  res.send(html)
});

app.get('/books', (req, res) => {
  let html = `
  <ul>
  ${books.map((books) => `<li>${books.title}</li>`).join("")}
  </ul>
  `
  res.send(html)
});

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

app.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id)
  let book = books.find((book) => {
    return book.id === id
  })
  if (!book) {
    return res.status(400).json({ status: 'Error', message: 'Book not found' })
  }
  return res.status(200).json({book:book})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});