'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  location: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255
  },
  role: {
    type: String,
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true
  }
}, { versionKey: false }, { collection: 'users' });

var UserModel = _mongoose2.default.model('users', UserSchema);

UserModel.getAll = function () {
  return UserModel.find({});
};

UserModel.removeUser = function (userName) {
  return UserModel.remove({ name: userName });
};
UserModel.findEmail = function (find) {

  return UserModel.findOne(find);
};
UserModel.getUser = function (id) {
  return UserModel.find({ '_id': id, active: true });
};

exports.default = UserModel;