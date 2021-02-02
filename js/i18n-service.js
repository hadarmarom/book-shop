var gTrans = {
    title: {
        en: 'Book Details',
        es: 'Mis Cosas Por Hacer',
        he: 'פירוט ספרים'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'price': {
        en: 'Price',
        es: '?',
        he: 'מחיר'
    },
    'id': {
        en: 'Id',
        es: '?',
        he: 'מק"ט',
    },
    'rate': {
        en: 'Rate',
        es: '?',
        he: 'דירוג',
    },
    'book-name': {
        en: 'Book Name',
        es: '?',
        he: 'שם הספר',
    },
    'img': {
        en: 'Image',
        es: '?',
        he: 'תמונה',
    },
    'action': {
        en: 'Action',
        es: '?',
        he: 'פעולות',
    },
    'stat-button-read': {
        en: 'Read',
        es: '?',
        he: 'עיין',
    },
    'stat-button-update': {
        en: 'Update',
        es: '?',
        he: 'עדכן',
    },
    'stat-button-delete': {
        en: 'Delete',
        es: '?',
        he: 'מחק',
    },
    'stat-input-add-book': {
        en: 'add book',
        es: '?',
        he: 'הוסף ספר',
    },
    'stat-input-add-price': {
        en: 'Add Price',
        es: '?',
        he: 'הוסף מחיר',
    },
    'add': {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    'submit': {
        en: 'Submit',
        es: '?',
        he: 'אישור'
    },
    'close': {
        en: 'Close',
        es: '?',
        he: 'סגור'
    },
    'next-page': {
        en: 'Next Page',
        es: '?',
        he: 'לדף הבא'
    },
    'prev-page': {
        en: 'Previous Page',
        es: '?',
        he: 'לדף הקודם  '
    }
}
var gCurrLang = 'en';


function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}
function dollarToShekel(dollar) {
    var shekel = 3.3 * dollar;
    return shekel.toFixed(2);
}
function dollarToEuro(dollar) {
    var euro = 0.83 * dollar;
    return euro.toFixed(2);
}
