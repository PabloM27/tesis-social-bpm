'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ProcessController = require('../controller/process');
var md_auth = require('../middelwares/authenticated');

var api = express.Router();

api.post('/process', md_auth.ensureAuth,ProcessController.createProcess);  
api.get('/process/:id', md_auth.ensureAuth,ProcessController.readProcess);  
api.get('/process/:id/activities', md_auth.ensureAuth,ProcessController.readAllProcessActivities);  


//api.get('/processes/:page',ProcessController.readProcesses);  
module.exports = api;