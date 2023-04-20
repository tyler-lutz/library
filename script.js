let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const book2 = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  423,
  true
);
const book3 = new Book("The Two Towers", "J.R.R. Tolkien", 352, true);
const book4 = new Book("The Return of the King", "J.R.R. Tolkien", 416, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

const booksGrid = document.querySelector(".books-grid");

function toggleRead(e) {
  const bookCard = e.target.parentElement;
  const bookTitle = bookCard.querySelector(".book-title").textContent;
  const book = myLibrary.find((book) => book.title === bookTitle);
  book.isRead = !book.isRead;
  updateBooksGrid();
}

function resetBooksGrid() {
  booksGrid.innerHTML = "";
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const readBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  bookTitle.classList.add("book-title");
  bookAuthor.classList.add("book-author");
  readBtn.classList.add("read-btn");
  readBtn.onclick = toggleRead;

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("read");
  } else {
    readBtn.textContent = "Not Read";
    readBtn.classList.add("not-read");
  }

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readBtn);

  booksGrid.appendChild(bookCard);
}

function updateBooksGrid() {
  resetBooksGrid();
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}

window.addEventListener("load", updateBooksGrid);
