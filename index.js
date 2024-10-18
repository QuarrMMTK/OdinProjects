const myLibrary = [];

class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleReadStatus(){
        this.isRead = !this.isRead;
    }

    info(){
        const readStatus = this.isRead? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach((book,index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const bookInfo = document.createElement("p");
        bookInfo.textContent = book.info();

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read Status";
        toggleReadButton.onclick = () => {
            book.toggleReadStatus();
            displayBooks();
        };

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            myLibrary.splice(index, 1);
            displayBooks();
        };

        bookCard.appendChild(bookInfo);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);
        libraryDiv.appendChild(bookCard);
    });
}

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    addBookToLibrary(title, author, pages, isRead);
    document.getElementById("book-form").reset();
    document.getElementById("book-form").style.display = "none";
});

document.getElementById("new-book-btn").onclick = () => {
    const form = document.getElementById("book-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 500, true);