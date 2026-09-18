# 📚 Book Management API

A lightweight RESTful API built with **Node.js** and **Express.js** for managing a bookstore inventory. This application provides full CRUD (Create, Read, Update, Delete) capabilities using a local `books.json` file as a simple database.

---

## 🚀 Features

- **Get All Books:** Retrieve the complete collection of books.
- **Filter by Genre:** Search books dynamically using query parameters (`?genre=Self-Help`).
- **Get Book by ID:** Fetch detailed information about a specific book.
- **Add New Book:** Insert new book entries with auto-generated unique IDs and field validation.
- **Update Book:** Modify existing book attributes partially using `PATCH`.
- **Delete Book:** Remove books from the collection by ID.
- **Pretty-Printed Persistence:** Saves array updates to `books.json` with clear formatting.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **File System Module:** Native `fs` module
- **API Client Testing:** Postman

---

## 📄 API Endpoints

### 1. Web Page

- **`GET /`** — Welcome page.
- **`GET /books`** — Displays an HTML list of all book titles.

---

### 2. REST API Routes

| Method     | Endpoint         | Description           | Request Body / Query             |
| :--------- | :--------------- | :-------------------- | :------------------------------- |
| **GET**    | `/api/books`     | Get all books         | Query option: `?genre=GenreName` |
| **GET**    | `/api/books/:id` | Get single book by ID | None                             |
| **POST**   | `/api/books`     | Add a new book        | JSON body with book details      |
| **PATCH**  | `/api/books/:id` | Update book details   | JSON body with fields to update  |
| **DELETE** | `/api/books/:id` | Delete a book by ID   | None                             |

---

## 💡 Request & Response Examples

### 1. 🔍 Get All Books / Filter (`GET /api/books`)

**Response (`200 OK`):**

```json
[
  {
    "id": 1,
    "title": "The Atomic Habits",
    "author": "James Clear",
    "genre": "Self-Help",
    "price": 499,
    "isAvailable": true
  }
]
```

---

### 2. 📖 Get Book By ID (GET /api/books/101)

**Response (200 OK):**

```json
{
  "book": {
    "id": 101,
    "title": "The Bare Foots",
    "author": "Johan Cruyff",
    "genre": "Self-Help",
    "price": 1005,
    "isAvailable": "true"
  }
}
```
---

### 3. ➕ Add New Book (POST /api/books)

**Request Body:**

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-Help",
  "price": 499,
  "isAvailable": true
}
```

**Response (201 Created):**

```json
{
  "status": "Success",
  "newid": 103
}
```
---
### 4. ✏️ Update Book (PATCH /api/books/102)

**Request Body:**

```json
{
  "price": 550,
  "isAvailable": false
}
```
**Response (200 OK):**

```json
{
  "status": "Success",
  "book": {
    "title": "The Bare Foots",
    "author": "Johan Cruyff",
    "genre": "Self-Help",
    "price": 550,
    "isAvailable": false,
    "id": 102
  }
}
```
---

### 5. 🗑️ Delete Book (DELETE /api/books/102)

**Response (200 OK):**

```json
{
  "status": "Success",
  "books": []
}
```
---

# 💻 Getting Started Locally
1. Prerequisites
Make sure you have **Node.js** installed on your machine.

2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Thunder-op2004/books-management-system.git

cd YOUR_REPOSITORY_NAME

npm install 
```

3. Run Server
Start the Express server:

```bash
node index.js
```
The server will run at: ``http://localhost:3000``

---

# 🧪 Postman Collection
**A pre-configured Postman Collection is included in the project root:**

``Book-Management-API.postman_collection.json``

**To test the API:**

Open **Postman**.

Click **Import** in the top left corner.

Choose the ``.json`` file from this project folder.

Run all saved ``GET``, ``POST``, ``PATCH,`` and ``DELETE`` requests!