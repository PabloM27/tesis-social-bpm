'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var ProcessController = require('../controller/process');

var api = express.Router();

api.post('/process',ProcessController.createProcess);  
api.get('/process/:id',ProcessController.readProcess);  
api.get('/process/:id/activities',ProcessController.readAllProcessActivities);  


//api.get('/processes/:page',ProcessController.readProcesses);  
module.exports = api;