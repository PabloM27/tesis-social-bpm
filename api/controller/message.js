'use strict'

//CONTROLADOR DE Message - SERVICIO DE Message

var Message = require('../model/message');
var moment = require('moment');

/*Crea nuevo mensaje*/

function createMessage(req, res) {
	var params = req.body;
	if (validateMessageCreate(params)) {
        var message = new Message();
        message.text = params.text;
        message.emitter = params.emitter;
		//creo el mensaje
	    doCreateMessage({ message: message, params: params, res: res });
			
	

	} else {
		res.status(200).send({
			message: 'send all message fields'
		});
	}
}

/*valida los datos minimos para creacion de usuario*/
function validateMessageCreate(p) {
	return (p.text && p.emitter  && p.receiver);
}


/*Crea mensaje pasado por parametro*/
function doCreateMessage(p) {
	var message = p.message;
	message.created_at = moment().unix();
	var params = p.params;
	var res = p.res;
	message.save((err, messageStored) => {
		if (err) return res.status(500).send({ message: 'error saving message' });
		if (messageStored) {
			res.status(200).send({ message: messageStored });
		} else {
			res.status(404).send({ message: 'unsaved message' });
		}
	})

}


//publico las funciones del controlador
module.exports = {
	createMessage 
}