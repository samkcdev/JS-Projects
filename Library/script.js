//Object Constructors
function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.
        pages} pages, ${this.readStatus}`
}

let bookCard = document.querySelector('.displayBook');
let showForm = document.querySelector('#showForm');
let addButton = document.querySelector('#addBook');
let cancelButton = document.querySelector('#cancelForm');
let form = document.querySelector("form");

window.addEventListener('load', showBook);


// showForm.addEventListener("click", function () {
//     form.classList.replace("hidden", "show");
// });

// cancelButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     form.classList.replace("show", "hidden");
// });

addButton.addEventListener("click", addNewBook);


function addNewBook(event) {
    event.preventDefault();

    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pagenumbers").value;
    let readStatusEle = document.querySelectorAll("input[name=status]");

    let readStatus;
    for (let radioVal of readStatusEle) {

        if (radioVal.checked) {
            readStatus = radioVal.value;
            break;
        }
    }

    if (title !== '' && author !== '' && pages !== '' && readStatusEle !== '') {
        let newBook = new Book(title, author, pages, readStatus);
        let localStorageData = localStorage.getItem('formData');
        if (localStorageData === null) {
            let libraryArray = [];
            libraryArray.push(newBook);
            localStorage.setItem('formData', JSON.stringify(libraryArray))
        } else {
            let existingBooksData = JSON.parse(localStorage.getItem('formData'));
            existingBooksData.push(newBook);
            localStorage.setItem('formData', JSON.stringify(existingBooksData));
        }
        showBook();
    } else {
        let displayMessage = document.createElement('p');
        displayMessage.innerText = "Please fill the form";
        bookCard.appendChild(displayMessage);
    }

}

function cardMaker(item, index) {
    let displayCard = document.createElement('div');
    displayCard.setAttribute("class", 'displayCard');
    displayCard.setAttribute("data-bookIndex", index);
    delButton = document.createElement('button');
    delButton.innerText = 'Delete this Book';
    displayCard.innerHTML =
        '<p>' + 'Book Title: ' + item.title + '</p>' +
        '<p>' + 'Author: ' + item.author + '</p>' +
        '<p>' + 'Number of Pages: ' + item.pages + '</p>' +
        '<p>' + 'Reading status: ' + item.readStatus + '</p>'
    displayCard.appendChild(delButton);
    bookCard.appendChild(displayCard);
    delButton.addEventListener('click', function (e) {
        let selectedCardForDel = +e.target.parentElement.getAttribute('data-bookIndex')
        if (index === selectedCardForDel) {
            //remove from DOM
            displayCard.remove();
            let existingBooksData = JSON.parse(localStorage.getItem('formData'));
            existingBooksData.splice(selectedCardForDel, 1);
            localStorage.setItem('formData', JSON.stringify(existingBooksData));
            showBook();
        }
    });
}



function showBook() {
    form.reset();

    let getDataFromLocal = JSON.parse(localStorage.getItem('formData'));

    if (getDataFromLocal === null) {
        bookCard.innerHTML = '<p>' + 'Add New books to show here' + '</p>';
    } else {
        bookCard.innerHTML = '';
        getDataFromLocal.forEach((element, index) => {
            cardMaker(element, index)
        });
    }
}













