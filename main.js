console.log("hello");

// Create array to store book objects
// create a book constructor
//    name, author
// Create a function that add the books to the array
//    the function takes the name, author, status(to read default)
// Create a function that deletes the book from the array
//    takes the book Id, and remove the corespondent book

const library = [];
const bookStatus = ["TO READ", "READING", "COMPLETED"];

function Book(name, author, status = bookStatus[0]) {
  let bookId = library.length;
  this.name = name;
  this.author = author;
  this.status = status;
  this.Id = bookId;
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
function deleteBook(bookId) {}
