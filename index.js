// Book constructor that we will use all the way
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author= author;
    this.pages = pages;
    this.isRead = isRead;
}

// just an example
let book = new Book('something', 'someone', 295, "yes");

// initialize global variable
let library;

// check if something there is in localStorage. If yes get it, if not just put some value
if (localStorage.getItem('books')) {
    library = JSON.parse(localStorage.getItem('books'));
} else {
    library = [book];
}

function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(library));
}
  
function addBookToLibrary(book) {
    // Update array
    library.push(book);
    //update local storage
    updateLocalStorage()
    // Update interface
    _createNewCard(book);
}

// Show all books added to the library
function showBooks() {
    removeAllCards();
    library.forEach((book) => {
        _createNewCard(book);
    })
}
// To update the page in showBooks()
function removeAllCards() {
    bookCards = document.getElementById('books');
    while (bookCards.firstChild) {
        bookCards.removeChild(bookCards.firstChild);
    }
}

// helper to add new card div
function _createNewCard(book) {
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'card');
    newDiv.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p><p>Pages: ${book.pages}</p><p class="readToggle" data-index="${library.indexOf(book)}">Read?: ${book.isRead}</p><p><button class="deleteButton" data-index="${library.indexOf(book)}">Delete</button></p>`;
    document.getElementById('books').appendChild(newDiv);
    
}
// Deletes certain card according to the index in library array
function deleteCard(indexInLibrary) {
    library.splice(indexInLibrary, 1);
    updateLocalStorage()

    showBooks()
}

///////////////////////// Click event handler ////////////////////////////
if (document.body.addEventListener){
    document.body.addEventListener('click',yourHandler,false);
}
else{
    document.body.attachEvent('onclick',yourHandler);//for IE
}

function yourHandler(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    // to get delete button
    if (target.className.match(/deleteButton/))
    {
        deleteCard(target.dataset.index)
    }
    // To change read status
    if (target.className.match(/readToggle/))
    {   
        if (library[target.dataset.index].isRead === "yes") {
            library[target.dataset.index].isRead = 'no';
            showBooks()
        } else {
            library[target.dataset.index].isRead = 'yes';
            showBooks()
        }
    }
}



////////////////////////// FORM ///////////////////////////

const form = document.getElementById('popupForm');
const cardAdd = document.getElementById('cardAdd');
cardAdd.addEventListener('click', () => {
    form.classList.toggle('show');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages= document.getElementById('pages').value;
    let isRead = document.querySelector('input[name="isRead"]:checked').value;

    let book = new Book(title, author, pages,isRead);
    addBookToLibrary(book);
})


showBooks();