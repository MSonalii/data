"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controller/user.controller");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Login routers details
router.get('/login', function (req, res) {
    res.render('login', { errorLogin: req.flash('error'), successLogin: req.flash('success') });
});
router.post('/login', function (req, res) {
    _user2.default.checkUser(req, res);
});

// Register router details
router.get('/register', function (req, res) {
    res.render('register', { errorLogin: req.flash('error'), successLogin: req.flash('success') });
});

router.post('/register', function (req, res) {
    _user2.default.addUser(req, res);
});

// user details update
router.get('/view/:id', function (req, res) {
    //res.render('home');
    _user2.default.getUsers(req, res);
});

router.delete('/deleteuser', function (req, res) {
    _user2.default.deleteUser(req, res);
});

exports.default = router;