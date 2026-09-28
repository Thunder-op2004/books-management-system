const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const {logreq} = require('./middlewares/book.js')
const bookRouter = require('./routes/book.js')

require('dotenv').config()

// Required Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(logreq('log.txt'))

// Connecting to MongoDb Database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log('Error connecting to MongoDb', err))


// HomePage Response
app.get('/', (req, res) => {
  let html = `
  <h1>Welcome to the Book Store</h1>
  `
  res.send(html)
});

app.use('/api/book',bookRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

