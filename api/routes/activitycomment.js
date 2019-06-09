'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ActivitycommentController = require('../controller/activitycomment');

var api = express.Router();

api.post('/activitycomment',ActivitycommentController.createActivitycomment);  
api.get('/activitycomments/:idProcess/:idActivity',ActivitycommentController.getActivitycomments);  

module.exports = api;