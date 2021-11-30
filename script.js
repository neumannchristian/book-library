let myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${
    haveRead ? "already read" : "not read yet"
  }`;
}

function addBookToLibrary(title, author, pages, haveRead) {
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);

console.log(myLibrary); 

