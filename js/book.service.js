'use strict'
const KEY = 'books';
var gBooks;
var gBookNames = ['eragon', 'avatar', 'gameOfThrones', 'hungerGames']
const PAGE_SIZE = 5;
var gPageIdx = 1;

_createBooks();

function getBooks() {
    var startIdx = (gPageIdx-1) * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getPageIdx() {
    return gPageIdx;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(bookName, price, rate) {
    var book = _createBook(bookName, price, rate)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId)
    book.price = newPrice;
    _saveBooksToStorage();
}

function getbookNames() {
    return gBookNames;
}

function nextPage() {
    gPageIdx++;
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) {
        // if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        // gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    // to loop pages
    // if (gPageIdx * PAGE_SIZE < gBooks.length) {
    // gPageIdx=Math.ceil(PAGE_SIZE/gBooks.length)+1;
    // console.log('Math.ceil(PAGE_SIZE/gBooks.length):', Math.ceil(PAGE_SIZE/gBooks.length))
    // }
}


function _createBook(bookName, price = getRandomIntInclusive(1, 200), rate = 0) {
    return {
        id: makeId(),
        name: bookName,
        price: price,
        imgUrl: bookName,
        desc: makeLorem(),
        rate: rate
    }
}


function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < gBookNames.length; i++) {
            var bookName = gBookNames[getRandomIntInclusive(0, gBookNames.length - 1)]
            var price = getRandomIntInclusive(0, 100)
            var rate = getRandomIntInclusive(0, 10)
            books.push(_createBook(bookName, price, rate))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}



