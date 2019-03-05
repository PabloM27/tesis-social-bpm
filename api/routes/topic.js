'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var TopicController = require('../controller/topic');

var api = express.Router();

api.post('/topic',TopicController.createTopic);  

module.exports = api;