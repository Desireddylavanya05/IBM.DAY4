# IBM.DAY4
# 📚 Library Management REST API

A simple **Library Management System** built using **Node.js, Express, and MongoDB**.
This project demonstrates **CRUD operations** with validations using **Mongoose**.


 🚀 Features

* Add multiple books to the database
* View all books
* Filter books by **category**
* Get books published **after 2015**
* Update available book copies (increase/decrease)
* Change book category
* Delete a book **only when available copies = 0**


 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**


📂 Project Structure

```
├── app.js              # Main server file
├── db.js               # MongoDB connection
├── bookmodel.js        # Book schema & model
├── package.json
└── package-lock.json

 ⚙️ Installation & Setup

 1️⃣ Clone the repository
git clone https://github.com/your-username/library-management-api.git
cd library-management-app

 2️⃣ Install dependencies
npm install

3️⃣ Start MongoDB
Make sure MongoDB is running locally:
mongod


4️⃣ Run the server
node app.js

Server will run at:


http://localhost:3000

 📌 API Endpoints

➕ Add Books (Insert minimum 7 books)

**POST**


/addBooks

📖 Get All Books

**GET**


/books


📚 Get Books by Category

**GET**


/books/category/:category

Example:
/books/category/AI


 📆 Get Books Published After 2015

**GET**

```
/books/year/after2015


🔄 Update Available Copies

**PUT**


/books/updateCopies/:id

**Body (JSON):**

```json
{
  "change": 2
}


➡️ Use negative value to decrease copies.

🏷️ Change Book Category

**PUT**

/books/changeCategory/:id
**Body (JSON):**
json
{
  "category": "Programming"
}


❌ Delete Book

**DELETE**

/books/delete/:id

⚠️ Book can be deleted **only if availableCopies = 0**



 ✅ Validations Implemented

* Available copies cannot be negative
* Book deletion is restricted if copies are available
* Error handling for invalid book IDs


📌 Database

* **Database Name:** `libraryDB`
* **Collection:** `books`


👩‍💻 Author

**Lavanya**
📌 Computer Science Student
📌 Learning Full Stack & Backend Development


