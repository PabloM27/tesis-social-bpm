'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var HashtagController = require('../controller/hashtag');

var api = express.Router();

api.post('/hashtag', HashtagController.createHashtag);
api.get('/hashtags', HashtagController.readAllHashtags);
api.get('/hashtags-count', HashtagController.countAllHashtags);
api.get('/hashtags-count/:hashtag?', HashtagController.countHashtags);


module.exports = api;