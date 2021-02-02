'use strict'

function onInit() {
    renderBooks()
    doTrans();
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        if (book.name !== gBookNames.find(function (name) { return name === book.name })) {
            book.imgUrl = 'defaultBook';
        }
        if (gCurrLang === 'en') {
            var transPrice = book.price + '$';
        } else if (gCurrLang === 'he') {
            transPrice = dollarToShekel(book.price) + '₪';
        } else {
            transPrice = dollarToEuro(book.price) + '€';
        }
        return ` <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td >${transPrice}</td>
                <td><img src="img/${book.imgUrl}.png" alt="img/book.png"></td>
                <td>${book.rate}</td>
                <td   style="width:240px"><button data-trans="stat-button-read" onclick="onReadBook('${book.id}')">read</button>
                <button data-trans="stat-button-update"onclick="onUpdateBook('${book.id}')">Update</button>
                <button data-trans="stat-button-delete" class="delete-btn" onclick="onDeleteBook('${book.id}')">delete</button></td>
                </tr>`
    })
    document.querySelector('.tBody').innerHTML = strHtmls.join('');
    doTrans();
}

function onAddBook(ev) {
    ev.preventDefault();
    console.log('gBooks.length:', gBooks.length)
    var bookName = document.querySelector('input[name=addNewBook]').value
    var price = document.querySelector('input[name=addNewPrice]').value
    var rate = document.querySelector('.rate').innerText
    if (gCurrLang === 'en') {
        var transPrice = price;
    } else if (gCurrLang === 'he') {
        transPrice = price * 0.303;
        transPrice=transPrice.toFixed(2)
    } else {
        transPrice = price * 1.2031;
        transPrice=transPrice.toFixed(2)
    }
    addBook(bookName, transPrice, rate)
    renderBooks()
    document.querySelector('input[name=addNewBook]').value = ''
    document.querySelector('input[name=addNewPrice]').value = ''
    document.querySelector('.rate').innerText = '0'
}

function onChangeRateSubmit(bookId) {
    var newRate = document.querySelector('.change-rate').innerText;
    debugger
    var locatedBook=gBooks.find(function (book){
        return bookId===book.id
    })
    console.log('locatedBook:', locatedBook)
    locatedBook.rate=newRate;
    renderBooks()
}


function onUpdateBook(bookId) {
    var price = prompt('price?');
    updateBook(bookId, price);
    renderBooks();
}


function onReadBook(bookId) {
    console.log('bookId:', bookId)
    var book = getBookById(bookId)
    var elModal = document.querySelector('.book-details')
    elModal.querySelector('.book-title').innerText = book.name
    document.querySelector('.modal-book-photo').innerHTML = `<img src="img/${book.imgUrl}.png" alt="img/book.png"></img>`
    elModal.querySelector('.long-description-book').innerText = book.desc
    elModal.querySelector('.change-rate').innerText = book.rate
    onChangeRateSubmit(bookId)
    var ratingBtn=elModal.querySelector('.submit-rating-btn')
    ratingBtn.setAttribute('data-id',bookId)
    elModal.hidden = false;
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.book-details').hidden = true
}

function renderRate(button) {
    var elRate = document.querySelector('.rate');
    if (button.innerText === '+') {
        if (elRate.innerText === '10') {
            elRate.innerText === '10'
        } else elRate.innerText++;
    } else if (elRate.innerText === '0') {
        elRate.innerText === '0'
    } else elRate.innerText--;
    renderBooks()
}

function renderChangeRate(button) {
    var elRate = document.querySelector('.change-rate');
    if (button.innerText === '+') {
        if (elRate.innerText === '10') {
            elRate.innerText === '10'
        } else elRate.innerText++;
    } else if (elRate.innerText === '0') {
        elRate.innerText === '0'
    } else elRate.innerText--;
}

function onRate(button, ev) {
    ev.preventDefault();
    renderRate(button)
}
function onChangeRate(button, ev) {
    ev.preventDefault();
    renderChangeRate(button)
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    renderBooks()
}


function onNextPage() {
    nextPage();
    renderBooks();
    var elPage = document.querySelector('.change-Page')
    elPage.innerText = getPageIdx();
    var elPrevPage = document.querySelector('.prev-page')
    var elNextPage = document.querySelector('.next-page')
    if (getPageIdx() > 1) {
        elPrevPage.classList.remove('hidden')
    }
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        
        elNextPage.classList.add('hidden')
    }    
}
function onPrevPage() {
    prevPage();
    renderBooks();
    var elPage = document.querySelector('.change-Page')
    elPage.innerText = getPageIdx();
    var elPrevPage = document.querySelector('.prev-page')
    var elNextPage = document.querySelector('.next-page')
    if (getPageIdx() <2) {
        elPrevPage.classList.add('hidden')
    }
    if (gPageIdx * PAGE_SIZE < gBooks.length) {
        
        elNextPage.classList.remove('hidden')
    }
}
