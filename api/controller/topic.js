'use strict'

//CONTROLADOR DE Topico - SERVICIO DE Topico

var Topic = require('../model/topic');
var moment = require('moment');

/*Crea nuevo topico*/

function createTopic(req, res) {
	var params = req.body;
	if (validateTopicCreate(params)) {
        var topic = new Topic();
        topic.title = params.title;
        topic.description = params.description;
        topic.owner =  params.owner;
        //faltan crear los msj del topico
	    doCreateTopic({ topic: topic, params: params, res: res });

	} else {
		res.status(200).send({
			message: 'send all topic fields'
		});
	}
}


/*valida los datos minimos para creacion de mensaje*/
function validateTopicCreate(p) {
	return (p.title && p.description && p.owner);
}


/*Crea topico  pasado por parametro*/
function doCreateTopic(p) {
	var topic = p.topic;
    topic.created_at = moment().unix();
    topic.updated_at = moment().unix();
	var params = p.params;
	var res = p.res;
	topic.save((err, topicStored) => {
		if (err) return res.status(500).send({ message: 'error saving topic' });
		if (topicStored) {
			res.status(200).send({ topic: topicStored });
		} else {
			res.status(404).send({ message: 'unsaved topic' });
		}
	})

}


//publico las funciones del controlador
module.exports = {
	createTopic 
}