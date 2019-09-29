'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var HashtagController = require('../controller/hashtag');
var md_auth = require('../middelwares/authenticated');

var api = express.Router();

api.post('/hashtag',md_auth.ensureAuth,HashtagController.createHashtag); 
api.get('/hashtags',md_auth.ensureAuth,HashtagController.readAllHashtags);
api.get('/hashtags-process/:idProcessBPM?',md_auth.ensureAuth,HashtagController.countAllHashtags);
api.get('/hashtags-count/:hashtag?', md_auth.ensureAuth,HashtagController.countHashtags);


module.exports = api;