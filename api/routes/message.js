'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var MessageController = require('../controller/message');

var api = express.Router();

api.post('/message',MessageController.createMessage);  

module.exports = api;