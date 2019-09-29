'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ActivityController = require('../controller/activity');
var md_auth = require('../middelwares/authenticated');
var api = express.Router();

api.post('/activity',md_auth.ensureAuth,ActivityController.createActivity);  
api.get('/activity/:idActivityBPM?/counters/',md_auth.ensureAuth,ActivityController.getHastagCounters);
api.get('/activity/:idActivityBPM/activitie-comments/:hashtag',md_auth.ensureAuth,ActivityController.getCommentsByHashtag);

module.exports = api;