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
    for (const status of bookStatus) {
      if (status.toUpperCase == newStatus) {
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

// function changeCover(bookId, coverLink) {
//   for (const book of library) {
//     if (book.ID == bookId) {
//       book.cover = coverLink;
//     }
//   }
// }

// function changeStatus(bookId, newStatus) {
//   for (const book of library) {
//     if (book.ID == bookId) {
//       book.status = newStatus;
//     }
//   }
// }

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
