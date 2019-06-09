'use strict'

//CONTROLADOR DE Comentario - SERVICIO DE Comenterio

var Comment = require('../model/comment');
var moment = require('moment');

/*Crea nuevo Comentario*/

function createComment(req, res) {
	var params = req.body;
	if (validateCommentCreate(params)) {
        var comment = new Comment();
        comment.text = params.text;
		comment.emitter = params.emitter;
		comment.topic = params.topic;
		//creo el comentario
	    doCreateComment({ comment: comment, params: params, res: res });
			
	

	} else {
		res.status(200).send({
			message: 'send all comment fields'
		});
	}
}

/*valida los datos minimos para creacion de Comment*/
function validateCommentCreate(p) {
	return (p.text &&  p.emitter && p.topic);
}


/*Crea publication pasado por parametro*/
function doCreateComment(p) {
	var comment = p.comment;
	comment.created_at = moment().unix();
	//var params = p.params;
	var res = p.res;
	comment.save((err, commentStored) => {
		if (err) return res.status(500).send({ message: 'error saving comment' });
		if (commentStored) {
			res.status(200).send({ comment: commentStored });
		} else {
			res.status(404).send({ message: 'unsaved comment' });
		}
	})

}


/*Lee Comment */
function readComment(req,res){
	var commentId = req.params.id;

	Comment.findById(commentId,(err,commentRead) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});

		if(!commentRead) return res.status(404).send({message:'El comentario no existe'})
		return res.status(200).send({comment:commentRead});		
	})
}

/*Lee Comment */
function readComments(req,res){
	var topicID = req.params.id;
	console.log("busca por : "+topicID);
	Comment.find({topic: topicID}).exec((err, data) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});

		if(!data) return res.status(404).send({message:'No existen comentarios'})
		return res.status(200).send({comments:data});		
	})
}

//publico las funciones del controlador
module.exports = {
    createComment,
	readComment,
	readComments
}