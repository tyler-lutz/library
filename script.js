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

function getBookFromForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  return new Book(title, author, pages, isRead);
}

function addBook(e) {
  e.preventDefault();
  const newBook = getBookFromForm();
  addBookToLibrary(newBook);
  updateBooksGrid();
  closeNewBookForm();
}

function removeBook(e) {
  const bookCard = e.target.parentElement;
  const bookTitle = bookCard.querySelector(".book-title").textContent;
  const bookIndex = myLibrary.findIndex((book) => book.title === bookTitle);
  myLibrary.splice(bookIndex, 1);
  updateBooksGrid();
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

const newBookBtn = document.querySelector(".new-book");
const booksGrid = document.querySelector(".books-grid");
const form = document.querySelector(".form");
const newBookForm = document.querySelector(".new-book-form");
const overlay = document.querySelector(".overlay");

newBookBtn.addEventListener("click", openNewBookForm);
newBookForm.addEventListener("submit", addBook);

function openNewBookForm() {
  newBookForm.reset();
  form.classList.add("active");
  overlay.classList.add("active");
}

function closeNewBookForm() {
  form.classList.remove("active");
  overlay.classList.remove("active");
}

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
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  bookTitle.classList.add("book-title");
  bookAuthor.classList.add("book-author");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("light-green");
  } else {
    readBtn.textContent = "Not Read";
    readBtn.classList.add("red");
  }

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);

  booksGrid.appendChild(bookCard);
}

function updateBooksGrid() {
  resetBooksGrid();
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}

window.addEventListener("load", updateBooksGrid);
