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
	constructor(name, author, status, cover) {
		this.name = name;
		this.author = author;
		this.status = status;
		this.ID = generateId();
		this.cover = cover;
	}

	changeStatus(newStatus) {
		if (bookStatus.indexOf(newStatus.toUpperCase()) == -1) {
			return "please enter a valid status"; // turn into a checking function maybe
		}
		for (const status of bookStatus) {
			if (newStatus.toUpperCase() == status) {
				this.status = status;
			}
		}
	}
	changeCover(coverLink) {
		this.cover = coverLink;
	}
}

function addBook(
	name,
	author,
	status = bookStatus[0],
	cover = coverPlaceholder
) {
	const newBookStatus = bookStatus.indexOf(status.toUpperCase());
	if (newBookStatus == -1) {
		console.log("please enter a valid status");
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

	renderBooks();
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
const bookDeleteButton = document.createElement("button");
bookDeleteButton.classList.add("delete");
bookDeleteButton.textContent = "delete";

bookCard.appendChild(bookTitle);
bookCard.appendChild(bookAuthor);
bookCard.appendChild(bookStatusToggle);
bookCard.appendChild(bookDeleteButton);

function renderBooks() {
	shelf.textContent = "";

	for (let book of library) {
		bookTitle.textContent = book.name;
		bookAuthor.textContent = book.author;
		bookStatusToggle.textContent = book.status;

		bookCard.setAttribute("data-id", book.ID);
		shelf.appendChild(bookCard.cloneNode(true));
	}
}

renderBooks();
const newBookForm = document.querySelector(".book-form");
const bookNameInput = document.querySelector("#book-name");
const bookAuthorInput = document.querySelector("#author-name");
// const bookCoverInput = document.querySelector("#cover");
const newBookButton = document.querySelector(".new-book-btn");
const submitButton = document.querySelector(".submit-btn");
const closeButton = document.querySelector("close-btn");

submitButton.addEventListener("click", submitBook);

function submitBook(e) {
	if (bookNameInput.value) {
		e.preventDefault();
		addBook(bookNameInput.value, bookAuthorInput.value);
		renderBooks();
		newBookForm.reset();
	}
}

// Delete Button
shelf.addEventListener("click", (e) => {
	if (e.target.matches(".delete"))
		deleteBook(Number(e.target.parentNode.getAttribute("data-id")));
});
// validation
// click del, remove the book,
// remove the book with the ID
// remove the book from array
// render
// Add tasks for next time
