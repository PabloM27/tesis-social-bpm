'use strict'

//CONTROLADOR DE Publication - SERVICIO DE Publication

var Publication = require('../model/publication');
var moment = require('moment');

/*Crea nueva publicacion*/

function createPublication(req, res) {
	var params = req.body;
	if (validatePublicationCreate(params)) {
        var publication = new Publication();
        publication.text = params.text;
        publication.emitter = params.emitter;
        publication.hashtags = params.hashtags;
		//creo la publicaicon
	    doCreatePublication({ publication: publication, params: params, res: res });
			
	

	} else {
		res.status(200).send({
			message: 'send all publication fields'
		});
	}
}

/*valida los datos minimos para creacion de publication*/
function validatePublicationCreate(p) {
	return (p.text &&  p.emitter);
}


/*Crea publication pasado por parametro*/
function doCreatePublication(p) {
	var publication = p.publication;
	publication.created_at = moment().unix();
	var params = p.params;
	var res = p.res;
	publication.save((err, publicationStored) => {
		if (err) return res.status(500).send({ message: 'error saving publication' });
		if (publicationStored) {
			res.status(200).send({ message: publicationStored });
		} else {
			res.status(404).send({ message: 'unsaved publication' });
		}
	})

}


//publico las funciones del controlador
module.exports = {
	createPublication 
}