'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var WorkFlowController = require('../controller/workflow');

var api = express.Router();
var md_auth = require('../middelwares/authenticated');

api.post('/workflow-executor',md_auth.ensureAuth,WorkFlowController.createActivityExecutor); 
api.post('/workflow-executor-update/',md_auth.ensureAuth,WorkFlowController.updateActivityExecutor);
api.get('/workflow-executor/:id',WorkFlowController.readActivityExecutorById);
api.get('/workflow-executor/:idProcessBPM/:processVersion/:idActivityBPM/:idCase',WorkFlowController.readActivityExecutor);

module.exports = api;