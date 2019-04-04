'use strict'

//mapeador de rutas de las peticiones a los metodos del controlador que da el api

var express = require('express');
var CommentController = require('../controller/comment');

var api = express.Router();

api.post('/comment',CommentController.createComment);  
api.get('/comment/:id',CommentController.readComment);  
module.exports = api;