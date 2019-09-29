'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var TopicController = require('../controller/topic');
var md_auth = require('../middelwares/authenticated');

var api = express.Router();

api.post('/topic', md_auth.ensureAuth,TopicController.createTopic);
api.get('/topic/:id', md_auth.ensureAuth,TopicController.readTopic);
api.get('/topic-full/:id',md_auth.ensureAuth, TopicController.readTopicFull);
api.get('/topics/:idProcess', md_auth.ensureAuth, TopicController.readTopics);

module.exports = api;