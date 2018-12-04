'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _books = require('../model/books.model');

var _books2 = _interopRequireDefault(_books);

var _user = require('../model/user.model');

var _user2 = _interopRequireDefault(_user);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};
controller.getAll = async function (req, res) {
    try {
        var books = await _books2.default.getAll();
        var data = [];
        books.forEach(function (key) {
            var element = {};
            element.name = key.name;
            element.publisher = key.publisher;
            element.owner = key.owner;
            element.price = key.price;
            element.genere = key.genere;
            element.id = key.id;
            data.push(element);
        });
        res.render('books', { booksResult: data, successAlert: req.flash('success') });
    } catch (err) {
        res.send('Got error in getAll');
    }
};
controller.getBook = async function (req, res) {
    try {
        var book_id = req.params.id;
        var books = await _books2.default.getBook(book_id);
        res.send(_lodash2.default.pick(books[0], ['name', 'genere', 'publisher', 'price', 'owner']));
    } catch (err) {
        res.send('Got error in getBook ' + err);
    }
};
controller.addBook = async function (req, res) {
    try {
        var _validateAddBook = validateAddBook(req.body),
            error = _validateAddBook.error;

        if (error) throw error.details[0].message;

        var savedBook = await new _books2.default({
            name: req.sanitize(req.body.name),
            genere: req.sanitize(req.body.genere),
            publisher: req.sanitize(req.body.publisher),
            price: req.sanitize(req.body.price)
        });

        var error11 = sanitizeAddBook(savedBook);
        if (error11) throw error11;

        await savedBook.save();
        req.flash('success', 'Book successfully added');
        res.redirect('/book/allbooks');
    } catch (err) {
        req.flash('error', '' + err);
        res.redirect('/book/addBook');
    }
};

controller.deleteBook = async function (req, res) {
    var bookName = req.body.name;
    try {
        var removedBook = await _books2.default.removeBook(bookName);
        res.send('Book successfully deleted');
    } catch (err) {
        res.send('Delete failed..!');
    }
};
controller.editBook = async function (req, res) {
    try {
        var _validateAddBook2 = validateAddBook(req.body),
            error = _validateAddBook2.error;

        if (error) throw error.details[0].message;
        var savedBook = await new _books2.default({
            name: req.body.name,
            genere: req.body.genere,
            publisher: req.body.publisher,
            price: req.body.price
        });
        //await savedBook.save();
        res.send({ status: 'success', message: 'Book updated successfully ' });
    } catch (err) {
        res.send({ status: 'danger', message: '' + err });
    }
};
function validateAddBook(book) {
    var schema = {
        name: _joi2.default.string().max(255).required(),
        genere: _joi2.default.string().max(255).required(),
        publisher: _joi2.default.string().max(255).required(),
        price: _joi2.default.string().max(255).required()
    };
    return _joi2.default.validate(book, schema);
}
function sanitizeAddBook(book) {
    if (book.name === '' || book.genere === '' || book.publisher === '' || book.price === '') {
        var err = 'Please enter valid details.';
        return err;
    }
}
exports.default = controller;