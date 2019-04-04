'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var TopicController = require('../controller/topic');

var api = express.Router();

api.post('/topic',TopicController.createTopic);
api.get('/topic/:id',TopicController.readTopic);
api.get('/topic-full/:id',TopicController.readTopicFull);  
api.get('/topics/:page?',TopicController.readTopics);

module.exports = api;