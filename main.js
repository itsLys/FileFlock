console.log("hello");

// Create array to store book objects
// create a book constructor
//    name, author
// Create a function that add the books to the array
//    the function takes the name, author, status(to read default)
// Create a function that deletes the book from the array
//    takes the book Id, and remove the corespondent book
function idGenerator() {
  let i = 0;
  return function () {
    return i++;
  };
}
const generateId = idGenerator();
const library = [];
const bookStatus = ["TO READ", "READING", "COMPLETED"];

function Book(name, author, status = bookStatus[0]) {
  let bookId = new Date().getTime();
  this.name = name;
  this.author = author;
  this.status = status;
  this.ID = generateId();
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
addBook("The Great Gatsby", "F. Scott Fitzgerald", "Reading");
addBook("To Kill a Mockingbird", "Harper Lee", "Completed");
addBook("1984", "George Orwell", "To Read");
addBook("The Catcher in the Rye", "J.D. Salinger", "Completed");
addBook("The Hobbit", "J.R.R. Tolkien", "To Read");
addBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Reading");

function deleteBook(bookId) {
  for (let book of library) {
    if (book.ID == bookId) {
      let index = library.indexOf(book);
      library.splice(index, 1);
    }
  }
}
// Go over the library, if the current item in the loop has the bookID as id, splice it
