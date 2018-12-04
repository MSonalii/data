'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooksSchema = _mongoose2.default.Schema({
    name: String,
    owner: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'UserSchema' }],
    genere: String,
    publisher: String,
    price: Number,
    lastupdated: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
    lastUpdatedBy: { type: Object }
}, { collection: 'books' });

var BooksModel = _mongoose2.default.model('books', BooksSchema);

BooksModel.getAll = function () {
    return BooksModel.find({ delete: false }).sort('_id');
};

BooksModel.getBook = function (book_id) {
    return BooksModel.find({ '_id': book_id, delete: false });
};

BooksModel.removeBooks = function (booksName) {
    return BooksModel.remove({ name: booksName });
};

exports.default = BooksModel;