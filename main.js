const generateId = idGenerator();
const library = [];
const bookStatus = ["to-read", "reading", "completed"];
const coverPlaceholder =
	"https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png";
const shelf = document.querySelector(".shelf");
const bookCard = document.createElement("div");
const bookTitle = document.createElement("h1");
const bookAuthor = document.createElement("span");
const bookStatusToggle = document.createElement("button");
const bookDeleteButton = document.createElement("button");
const newBookForm = document.querySelector(".book-form");

const formContainer = document.querySelector(".form-con");
const bookNameInput = document.querySelector("#book-name");
const bookAuthorInput = document.querySelector("#author-name");
const newBookButton = document.querySelector(".new-book-btn");
const submitButton = document.querySelector(".submit-btn");
const closeButton = document.querySelector("close-btn");
const radioButton = document.createElement("input");
const radioLabel = document.createElement("label");
const statusField = newBookForm.querySelector("fieldset");
const radioButtons = document.getElementsByName("status");

bookDeleteButton.classList.add("delete");
bookDeleteButton.textContent = "delete";
radioButton.setAttribute("type", "radio");
radioButton.setAttribute("name", "status");

bookCard.appendChild(bookTitle);
bookCard.appendChild(bookAuthor);
bookCard.appendChild(bookStatusToggle);
bookCard.appendChild(bookDeleteButton);

submitButton.addEventListener("click", submitBook);
shelf.addEventListener("click", (e) => {
	if (e.target.matches(".delete"))
		deleteBook(Number(e.target.parentNode.getAttribute("data-id")));
});

class Book {
	constructor(name, author, status, cover) {
		this.name = name;
		this.author = author;
		this.status = status;
		this.ID = generateId();
		this.cover = cover;
	}

	changeStatus(newStatus) {
		if (bookStatus.indexOf(newStatus.toLowerCase()) == -1) {
			return "please enter a valid status"; // turn into a checking function maybe
		}
		for (const status of bookStatus) {
			if (newStatus.toLowerCase() == status) {
				this.status = status;
			}
		}
	}
	changeCover(coverLink) {
		this.cover = coverLink;
	}
}

function idGenerator() {
	let i = 0;
	return function () {
		return i++;
	};
}

function addBook(
	name,
	author,
	status = bookStatus[0],
	cover = coverPlaceholder
) {
	const newBookStatus = bookStatus.indexOf(status.toLowerCase());
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

function submitBook(e) {
	if (bookNameInput.value) {
		e.preventDefault();
		let status;
		for (let radio of radioButtons) {
			if (radio.checked) {
				status = radio.id;
			}
		}
		addBook(bookNameInput.value, bookAuthorInput.value, status);
		renderBooks();
		newBookForm.reset();
	}
}

function renderStatus() {
	for (let status of bookStatus) {
		radioLabel.setAttribute("for", status);
		radioLabel.textContent = status;
		radioButton.id = status;
		statusField.appendChild(radioButton.cloneNode(true));
		statusField.appendChild(radioLabel.cloneNode(true));
	}
	const toReadRadioButton = document.querySelector("#to-read");
	toReadRadioButton.setAttribute("checked", "");
}

addBook("The Great Gatsby", "F. Scott Fitzgerald", "Reading");
addBook("To Kill a Mockingbird", "Harper Lee", "Completed");
addBook("1984", "George Orwell", "To-Read");
addBook(
	"The Catcher in the Rye",
	"J.D. Salinger",
	"Completed",
	"https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg"
);
addBook("The Hobbit", "J.R.R. Tolkien", "To-Read");
addBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling");

renderBooks();
renderStatus();

document.addEventListener("click", controlModal);

function controlModal(e) {
	if (e.target.id == "new-book-btn") {
		formContainer.classList.add("open");
	}
	if (e.target.id == "close-btn" || e.target == formContainer) {
		formContainer.classList.remove("open");
	}
}

// to do [note to self]
