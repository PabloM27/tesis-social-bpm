'use strict'

//CONTROLADOR DE HASHTAG - SERVICIO DE HASHTAG
//UserSchema lo da el ORM permit
var HashTag = require('../model/hashtag');
var moment = require('moment');

/*Crea nuevo hashtag*/

function createHashtag(req, res) {
	var params = req.body;
	if (validateHashtagCreate(params)) {
		var hashtag = new HashTag();
		hashtag.text = params.text;
		//validacion de existencia de hashtag
		HashTag.find({
			$or: [
				{ text: hashtag.text.toLowerCase() }
			]
		}).exec((err, readHashtag) => {
			if (err) return res.status(500).send({ message: 'error in server' });
			if (readHashtag && readHashtag.length >= 1) {
				return res.status(500).send({ message: 'hashtag already exists' });
			} else {
				doCreateHashtag({ hashtag: hashtag, params: params, res: res });
			}
		});

	} else {
		res.status(200).send({
			message: 'send all hashtag fields'
		});
	}
}

/*valida los datos minimos para creacion de hashtag*/
function validateHashtagCreate(p) {
	return (p.text);
}

/*Crea hashtag pasado por parametro*/
function doCreateHashtag(p) {
	var hashtag = p.hashtag;
	hashtag.created_at = moment().unix();
	var params = p.params;
	var res = p.res;
	hashtag.save((err, hashtagStored) => {
		if (err) return res.status(500).send({ message: 'error saving hashtag' });
		if (hashtagStored) {
			res.status(200).send({ hashtag: hashtagStored });
		} else {
			res.status(404).send({ message: 'unsaved hashtag' });
		}
	})

}


//publico las funciones del controlador
module.exports = {
	createHashtag
}



