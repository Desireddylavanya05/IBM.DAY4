const express = require("express");
const Book = require("app.js");

const app = express();
app.use(express.json());

/* ------------------ CREATE ------------------ */
// Insert minimum 7 books
app.post("/addBooks", async (req, res) => {
  try {
    const books = await Book.insertMany([
      { title: "Clean Code", author: "Robert C Martin", category: "Programming", publishedYear: 2008, availableCopies: 5 },
      { title: "Atomic Habits", author: "James Clear", category: "Self Help", publishedYear: 2018, availableCopies: 4 },
      { title: "Deep Learning", author: "Ian Goodfellow", category: "AI", publishedYear: 2016, availableCopies: 6 },
      { title: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", publishedYear: 2015, availableCopies: 3 },
      { title: "Data Science Handbook", author: "Jake VanderPlas", category: "Data Science", publishedYear: 2017, availableCopies: 2 },
      { title: "Think Like a Monk", author: "Jay Shetty", category: "Self Help", publishedYear: 2020, availableCopies: 7 },
      { title: "AI Basics", author: "Tom Taulli", category: "AI", publishedYear: 2019, availableCopies: 1 }
    ]);

    res.json({ message: "Books inserted successfully", books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ------------------ READ ------------------ */

// All books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Books by category
app.get("/books/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
});

// Books after year 2015
app.get("/books/year/after2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

/* ------------------ UPDATE ------------------ */

// Increase / decrease copies
app.put("/books/updateCopies/:id", async (req, res) => {
  const { change } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.availableCopies + change < 0)
      return res.status(400).json({ error: "Negative stock not allowed" });

    book.availableCopies += change;
    await book.save();

    res.json({ message: "Copies updated", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change category
app.put("/books/changeCategory/:id", async (req, res) => {
  const { category } = req.body;

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category },
    { new: true }
  );

  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

/* ------------------ DELETE ------------------ */

// Remove book if copies = 0
app.delete("/books/delete/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({ error: "Cannot delete book with available copies" });

  await book.deleteOne();
  res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
