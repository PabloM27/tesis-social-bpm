'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ActivitycommentController = require('../controller/activitycomment');
var md_auth = require('../middelwares/authenticated');
var api = express.Router();

api.post('/activitycomment',md_auth.ensureAuth,ActivitycommentController.createActivitycomment);  
api.get('/activitycomments/:idProcess/:idActivity',md_auth.ensureAuth,ActivitycommentController.getActivitycomments);  

module.exports = api;