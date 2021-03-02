const BASE_URL = "http://localhost:3000/";
const BOOKS_URL = "http://localhost:3000/books/"

document.addEventListener("DOMContentLoaded", function () {
  fetch(BOOKS_URL)
    .then((res) => res.json())
    .then((books) => books.forEach(renderBook));
});

// Function to render books
function renderBook(book) {
    const listItem = document.createElement('li');

    listItem.innerText = book.title
    listItem.addEventListener('click', () => {renderDetails(book)})

    const ul = document.getElementById('list');
    ul.append(listItem)
}

// Render book details
function renderDetails(book){

    const showPanel = document.getElementById("show-panel")
    showPanel.innerHTML = ""

    const bookImg = document.createElement("img")
    bookImg.src = book.img_url

    const bookTitle = document.createElement("h2")
    bookTitle.innerText = book.title

    const bookSubtitle = document.createElement("h3")
    bookSubtitle.innerText = book.subtitle || "";

    const bookAuthor = document.createElement("h3")
    bookAuthor.innerText = book.author

    const bookDesc = document.createElement("p")
    bookDesc.innerText = book.description

    const userList = document.createElement('ul')

    // iterates through users who liked book
    book.users.forEach(user => {
        // creates p element for username
        const userName = document.createElement('li')
        // inputs username text
        userName.innerText = user.username
        // appends username li to userList ul
        userList.append(userName)
    })

    const likeBtn = document.createElement('button')
    likeBtn.innerText = "Like"
    likeBtn.addEventListener('click', () => {
        likeBook(book)
        const userName = document.createElement('li')
        userName.innerText = "pouros"
        userList.append(userName)
    })

    showPanel.append(bookImg, bookTitle, bookSubtitle, bookAuthor, bookDesc, userList, likeBtn)

}

function likeBook(book){

    const updatedUsers = {
        users: [...book.users, {"id": 1, "username": "pouros"}]
    }

    const obj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(updatedUsers)
    }

    fetch(BOOKS_URL + book.id, obj).then()
}