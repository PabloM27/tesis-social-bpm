'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var WorkFlowController = require('../controller/workflow');

var api = express.Router();

api.post('/workflow-executor',WorkFlowController.createActivityExecutor);
api.get('/workflow-executor/:id',WorkFlowController.readActivityExecutorById);
api.get('/workflow-executor/:idProcessBPM/:processVersion/:idCase/:idActivityBPM',WorkFlowController.readActivityExecutor);


module.exports = api;