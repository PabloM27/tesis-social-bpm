'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ActivityController = require('../controller/activity');

var api = express.Router();

api.post('/activity',ActivityController.createActivity);  
api.get('/activity/:idActivityBPM?/counters/',ActivityController.getHastagCounters);
api.get('/activity/:idActivityBPM/activities/:hashtag',ActivityController.getMessagesByHashtag);

module.exports = api;