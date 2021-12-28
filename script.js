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

function Book(title, author, totalPages, currentPage, finished) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.currentPage = currentPage;
  this.finished = finished;
}

Book.prototype.evalFinished = function () {
  return (this.finished = this.currentPage == this.totalPages ? true : false);
};

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${
    finished ? "already read" : "not read yet"
  }`;
};

function addBookToLibraryArray(title, author, pages, currentPage, finished) {
  let newBook = new Book(title, author, pages, currentPage, finished);
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

addBookToLibraryArray("The Hobbit", "J.R.R. Tolkien", 295, 240, true);
addBookToLibraryArray("Die Verwandlung", "Franz Kafka", 212, 211, true);
addBookToLibraryArray(
  "The Sun Also Rises",
  "Ernest Miller Hemingway",
  224,
  0,
  false
);
addBookToLibraryArray(
  "The Constant Wife",
  "W. Somerset Maugham",
  123,
  0,
  false
);
addBookToLibraryArray("It", "Stephen King", 128, 12, false);
addBookToLibraryArray(
  "The Hitchhiker's Guide to the Galaxy",
  "Douglas Adams",
  528,
  0,
  false
);

function appendElement(target, element, text, cssClass = "") {
  element.classList.add(cssClass);
  element.textContent = text;
  target.appendChild(element);
}

function addBookToBookDisplay(Book, i) {
  let bookCard = document.createElement("div");
  let bookCardCoverWrapper = document.createElement("div"); //required for clearing z-index stack
  let bookCardCover = document.createElement("div");
  let bookCardFooter = document.createElement("div");
  let bookCardTitle = document.createElement("p");
  let bookCardAuthor = document.createElement("p");
  let bookCardTotalPages = document.createElement("span");

  let bookCardFinishedLabel = document.createElement("label");
  let bookCardFinishedCheckbox = document.createElement("input");
  bookCardFinishedCheckbox.setAttribute("type", "checkbox");
  let bookCardFinishedSlider = document.createElement("span");

  let bookCardReadingProgressWrapper = document.createElement("div");
  let bookCardReadingProgressInput = document.createElement("input");

  let bookCardRemoveBookBtn = document.createElement("span");

  appendElement(bookCard, bookCardCoverWrapper, "", "book-card-cover-wrapper");
  appendElement(bookCardCoverWrapper, bookCardCover, "", "book-card-cover");

  appendElement(bookCardCover, bookCardRemoveBookBtn, "", "book-card-delete");

  bookCardRemoveBookBtn.insertAdjacentHTML("afterbegin", "&times;");

  bookCardRemoveBookBtn.addEventListener("click", function (e) {
    myLibrary.splice(e.target.parentNode.dataset.index, 1);
    populateBookDisplay();
  });

  appendElement(bookCardCover, bookCardAuthor, Book.author, "book-card-author");
  appendElement(bookCardCover, bookCardTitle, Book.title, "book-card-title");

  // Footer

  appendElement(bookCard, bookCardFooter, "", "book-card-footer");

  // Reading Progress Slider

  appendElement(
    bookCardFooter,
    bookCardReadingProgressWrapper,
    "",
    "book-card-reading-progress-wrapper"
  );
  appendElement(
    bookCardReadingProgressWrapper,
    bookCardReadingProgressInput,
    "",
    "book-card-reading-progress-input"
  );

  bookCardReadingProgressInput.type = "range";
  bookCardReadingProgressInput.min = 0;
  bookCardReadingProgressInput.max = Book.totalPages ? Book.totalPages : 100;
  bookCardReadingProgressInput.value = Book.currentPage ? Book.currentPage : 0;

  bookCardReadingProgressInput.oninput = function(e) {
    Book.currentPage = e.target.value;
  };

  // Finished Reading Checkbox

  appendElement(
    bookCardFooter,
    bookCardFinishedLabel,
    "read?",
    "book-card-finished-label"
  );

  appendElement(
    bookCardFinishedLabel,
    bookCardFinishedCheckbox,
    "",
    "book-card-finished-checkbox"
  );

  appendElement(
    bookCardFinishedLabel,
    bookCardFinishedSlider,
    "",
    "book-card-finished-slider"
  );

  appendElement(
    bookCardFooter,
    bookCardTotalPages,
    Book.totalPages,
    "book-card-totalPages"
  );

  syncBookCardCheckboxState();

  bookCardFinishedCheckbox.addEventListener("click", function (e) {
    e.target.checked ? (Book.finished = true) : (Book.finished = false);
  });

  bookCard.dataset.index = i;
  bookCard.classList.add("book-card");

  bookDisplay.appendChild(bookCard);

  function syncBookCardCheckboxState() {
    Book.finished
      ? bookCardFinishedCheckbox.setAttribute("checked", "")
      : bookCardFinishedCheckbox.removeAttribute("checked");
  }
}

function populateBookDisplay() {
  resetBookDisplay();
  myLibrary.forEach((e, i) => addBookToBookDisplay(e, i));
}

populateBookDisplay();
