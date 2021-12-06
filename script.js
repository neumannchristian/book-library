const bookDisplay = document.querySelector("#book-display");

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

function addBookToLibrary(title, author, pages, haveRead) {
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Die Verwandlung", "Franz Kafka", 212, true);
addBookToLibrary("The Sun Also Rises", "Ernest Miller Hemingway", 224, false);
addBookToLibrary("The Constant Wife", "W. Somerset Maugham", 123, false);
addBookToLibrary("It", "Stephen King", 128, false);

function populateBookDisplay() {
  myLibrary.forEach((e, i) => {
    let bookCard = document.createElement("div");
    let bookCardTitle = document.createElement("div");
    let bookCardAuthor = document.createElement("div");
    let bookCardTotalPages = document.createElement("div");
    let bookCardHaveRead = document.createElement("div");

    bookCard.dataset.index = i;
    bookCard.classList.add("book-card");

    bookCardTitle.classList.add("card-book-title");
    bookCardTitle.textContent = e.title;
    
    bookCardAuthor.textContent = e.author;
    
    bookCardTotalPages.textContent = e.totalPages;

    bookCardHaveRead.textContent = e.haveRead;
    console.log(e.haveRead);

    bookCard.appendChild(bookCardTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardTotalPages);
    bookCard.appendChild(bookCardHaveRead)
    bookDisplay.appendChild(bookCard);
  });
}

populateBookDisplay();
