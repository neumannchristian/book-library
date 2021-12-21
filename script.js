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

function appendElement(target, element, text, cssClass = "") {
  element.classList.add(cssClass);
  element.textContent = text;
  target.appendChild(element);
}

function addBookToBookDisplay(Book, i) {
  let bookCard = document.createElement("div");
  let bookCardCover = document.createElement("div");
  let bookCardFooter = document.createElement("div");
  let bookCardTitle = document.createElement("p");
  let bookCardAuthor = document.createElement("p");
  let bookCardTotalPages = document.createElement("span");

  let bookCardHaveReadLabel = document.createElement("label");
  let bookCardHaveReadCheckbox = document.createElement("input");
  bookCardHaveReadCheckbox.setAttribute("type", "checkbox");
  let bookCardHaveReadSlider = document.createElement("span");

  let bookCardRemoveBookBtn = document.createElement("span");

  appendElement(bookCard, bookCardCover, "", "book-card-cover");

  appendElement(
    bookCardCover,
    bookCardRemoveBookBtn,
    "",
    "book-card-delete"
  );

  bookCardRemoveBookBtn.insertAdjacentHTML('afterbegin','&times;')

  bookCardRemoveBookBtn.addEventListener("click", function (e) {
    myLibrary.splice(e.target.parentNode.dataset.index, 1);
    populateBookDisplay();
  });

  appendElement(bookCardCover, bookCardAuthor, Book.author, "book-card-author");
  appendElement(bookCardCover, bookCardTitle, Book.title, "book-card-title");

  // Footer

  appendElement(bookCard, bookCardFooter, "", "book-card-footer");

  appendElement(
    bookCardFooter,
    bookCardHaveReadLabel,
    "read?",
    "book-card-haveRead-label"
  );

  appendElement(
    bookCardHaveReadLabel,
    bookCardHaveReadCheckbox,
    "",
    "book-card-haveRead-checkbox"
  );

  appendElement(
    bookCardHaveReadLabel,
    bookCardHaveReadSlider,
    "",
    "book-card-haveRead-slider"
  );

  appendElement(
    bookCardFooter,
    bookCardTotalPages,
    Book.totalPages,
    "book-card-totalPages"
  );

  syncBookCardCheckboxState();

  bookCardHaveReadCheckbox.addEventListener("click", function (e) {
    e.target.checked ? (Book.haveRead = true) : (Book.haveRead = false);
  });

  bookCard.dataset.index = i;
  bookCard.classList.add("book-card");

  bookDisplay.appendChild(bookCard);

  function syncBookCardCheckboxState() {
    Book.haveRead
      ? bookCardHaveReadCheckbox.setAttribute("checked", "")
      : bookCardHaveReadCheckbox.removeAttribute("checked");
  }
}

function populateBookDisplay() {
  resetBookDisplay();
  myLibrary.forEach((e, i) => addBookToBookDisplay(e, i));
}

populateBookDisplay();
