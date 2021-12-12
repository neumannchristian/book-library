const bookDisplay = document.querySelector("#book-display");
const bookOpenAddToLibraryModalBtn = document.querySelector(
  "#book-openAddToLibraryModal"
);
const modal = document.querySelector("#modal");
const modalCloseBtn = document.querySelector(
  "#AddToLibraryWrapper span:first-child"
);
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const totalPagesInput = document.querySelector("#totalPagesInput");
const addToLibraryBtn = document.querySelector("#addToLibraryBtn");

let myLibrary = [];

function Book(title, author, totalPages, haveRead) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.haveRead = haveRead;
}

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${
    haveRead ? "already read" : "not read yet"
  }`;
};

function addBookToLibraryArray(title, author, pages, haveRead) {
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

bookOpenAddToLibraryModalBtn.addEventListener("click", function () {
  modal.style.display = "grid";
});

modalCloseBtn.addEventListener("click", function (event) {
  modal.style.display = "none";
});

addToLibraryBtn.addEventListener("click", function () {
  addBookToLibraryArray(
    titleInput.value,
    authorInput.value,
    totalPagesInput.value,
    true
  );
  modal.style.display = "none";
  resetBookDisplay();
  populateBookDisplay();
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function resetBookDisplay() {
  let childCount = bookDisplay.childElementCount;
  for (let i = childCount - 1; i > 0; i--) {
    bookDisplay.children[i].remove();
  }
}

addBookToLibraryArray("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibraryArray("Die Verwandlung", "Franz Kafka", 212, true);
addBookToLibraryArray(
  "The Sun Also Rises",
  "Ernest Miller Hemingway",
  224,
  false
);
addBookToLibraryArray("The Constant Wife", "W. Somerset Maugham", 123, false);
addBookToLibraryArray("It", "Stephen King", 128, false);

function addBookToBookDisplay(Book, i) {
  let bookCard = document.createElement("div");
  let bookCardTitle = document.createElement("div");
  let bookCardAuthor = document.createElement("div");
  let bookCardTotalPages = document.createElement("div");
  let bookCardHaveRead = document.createElement("div");

  bookCard.dataset.index = i;
  bookCard.classList.add("book-card");

  bookCardTitle.classList.add("card-book-title");
  bookCardTitle.textContent = Book.title;

  bookCardAuthor.textContent = Book.author;

  bookCardTotalPages.textContent = Book.totalPages;

  bookCardHaveRead.textContent = Book.haveRead;

  bookCard.appendChild(bookCardTitle);
  bookCard.appendChild(bookCardAuthor);
  bookCard.appendChild(bookCardTotalPages);
  bookCard.appendChild(bookCardHaveRead);
  bookDisplay.appendChild(bookCard);
}

function populateBookDisplay() {
  myLibrary.forEach((e, i) => addBookToBookDisplay(e, i));
}

populateBookDisplay();
