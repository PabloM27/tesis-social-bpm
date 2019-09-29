'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var CommentController = require('../controller/comment');
var md_auth = require('../middelwares/authenticated');

var api = express.Router();

api.post('/comment',md_auth.ensureAuth, CommentController.createComment);  
api.get('/comment/:id',md_auth.ensureAuth, CommentController.readComment);  
api.get('/comments/:id',md_auth.ensureAuth, CommentController.readComments);  
module.exports = api;