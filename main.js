function idGenerator() {
  let i = 0;
  return function () {
    return i++;
  };
}
const generateId = idGenerator();
const library = [];
const bookStatus = ["TO READ", "READING", "COMPLETED"];
const imagePlaceholder =
  "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png";
function Book(name, author, status = bookStatus[0], cover = imagePlaceholder) {
  this.name = name;
  this.author = author;
  this.status = status;
  this.ID = generateId();
  this.cover = cover;
}

function addBook(name, author, status) {
  const newBookStatus = bookStatus.indexOf(status.toUpperCase());
  if (newBookStatus == -1) {
    return "please enter a valid status";
  } else {
    const newBook = new Book(name, author, bookStatus[newBookStatus]);
    library.push(newBook);
  }
}

function deleteBook(bookId) {
  for (let book of library) {
    if (book.ID == bookId) {
      let index = library.indexOf(book);
      library.splice(index, 1);
    }
  }
}

function changeCover(bookId, coverLink) {
  for (const book of library) {
    if (book.ID == bookId) {
      book.cover = coverLink;
    }
  }
}

function changeStatus(bookId, newStatus) {
  for (const book of library) {
    if (book.ID == bookId) {
      book.status = newStatus;
    }
  }
}

addBook("The Great Gatsby", "F. Scott Fitzgerald", "Reading");
addBook("To Kill a Mockingbird", "Harper Lee", "Completed");
addBook("1984", "George Orwell", "To Read");
addBook(
  "The Catcher in the Rye",
  "J.D. Salinger",
  "Completed",
  "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg"
);
addBook("The Hobbit", "J.R.R. Tolkien", "To Read");
addBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Reading");
