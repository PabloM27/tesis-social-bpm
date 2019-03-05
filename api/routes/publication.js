'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var PublicationController = require('../controller/publication');

var api = express.Router();

api.post('/publication',PublicationController.createPublication);  

module.exports = api;