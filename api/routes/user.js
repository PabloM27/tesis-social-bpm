'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var UserController = require('../controller/user');

var api = express.Router();
var md_auth = require('../middelwares/authenticated');

//middleware para subir archivos en varias partes del request
//var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'}); 

api.get('/home',UserController.home);
api.post('/register',UserController.saveUser); 
api.post('/login',UserController.loginUser);
api.get('/user/:id',md_auth.ensureAuth,UserController.readUser); 
api.get('/users/:page?',md_auth.ensureAuth,UserController.readUsers);

module.exports = api;
