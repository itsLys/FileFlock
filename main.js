function idGenerator() {
  let i = 0;
  return function () {
    return i++;
  };
}
const generateId = idGenerator();
const library = [];
const bookStatus = ["TO READ", "READING", "COMPLETED"];
const coverPlaceholder =
  "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png";

class Book {
  constructor(name, author, status = bookStatus[0], cover = coverPlaceholder) {
    this.name = name;
    this.author = author;
    this.status = status;
    this.ID = generateId();
    this.cover = cover;
  }
  changeStatus(newStatus) {
    // this.status = newStatus;
    if (bookStatus.indexOf(newStatus.toUpperCase()) == -1) {
      return "please enter a valid status"; // turn into a checking function maybe
    }
    for (const status of bookStatus) {
      if (newStatus.toUpperCase() == status) {
        this.status = status;
      } // for each status of bookStatus, if newStatus is equal to status, this status is status
      //
    }
  }
  changeCover(coverLink) {
    this.cover = coverLink;
  }
}

function addBook(name, author, status, cover) {
  const newBookStatus = bookStatus.indexOf(status.toUpperCase());
  if (newBookStatus == -1) {
    return "please enter a valid status";
  } else {
    const newBook = new Book(name, author, bookStatus[newBookStatus], cover);
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

const shelf = document.querySelector(".shelf");
const bookCard = document.createElement("div");
const bookTitle = document.createElement("h1");
const bookAuthor = document.createElement("span");
const bookStatusToggle = document.createElement("button");

bookCard.appendChild(bookTitle);
bookCard.appendChild(bookAuthor);
bookCard.appendChild(bookStatusToggle);

function renderBooks() {
  for (let book of library) {
    bookTitle.textContent = book.name;
    bookAuthor.textContent = book.author;
    bookStatusToggle.textContent = book.status;
    shelf.appendChild(bookCard.cloneNode(true));
  }
}
renderBooks();
