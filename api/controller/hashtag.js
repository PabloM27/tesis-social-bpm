'use strict'

//CONTROLADOR DE HASHTAG - SERVICIO DE HASHTAG
//UserSchema lo da el ORM permit 
var HashTag = require('../model/hashtag');
var ActivityComment = require('../model/activitycomment');
var moment = require('moment');

/*Crea nuevo hashtag*/

function createHashtag(req, res) {
	var params = req.body;
	if (validateHashtagCreate(params)) {
		var hashtag = new HashTag();
		hashtag.text = params.text;
		hashtag.style = params.style;
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

/*Retorna todos los hashtags*/
function readAllHashtags(req, res) {
    //recuperamosa todos,pero no enviamos la pass
    HashTag.find({}, (err, hashtags) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!hashtags) return res.status(500).send({ message: 'No hay hashtags disponibles' });
        //llama a funcion asincronica
        return res.status(200).send({ hashtags });
    });
}

/*Retorna la cantidad total de hashtags  */
async function countAllHashtags(req, res) {
	let idProcessBPM ="";
	console.log(req.idProcessBPM);
	if (req.params.idProcessBPM) {
        idProcessBPM = req.params.idProcessBPM;
	}
	let count = {error:0,alerta:0,info:0,recomendacion:0}
	//podria mejorarse con un Promise.all y que se lean en paralelo
	// tambien mongoose puede tener algun metodo para hacer un count 
	// en una sola consulta
	count.error = await countHashtagsSync({hashtagType:"error",idProcessBPM:idProcessBPM}); 
	count.alerta = await countHashtagsSync({hashtagType:"alerta",idProcessBPM:idProcessBPM}); 
	count.info = await countHashtagsSync({hashtagType:"info",idProcessBPM:idProcessBPM}); 
	count.recomendacion = await countHashtagsSync({hashtagType:"recomendacion",idProcessBPM:idProcessBPM}); 
	res.status(200).send({ count });
}

async function countHashtagsSync( params) {
	let count = 0;
	
	await ActivityComment.find({ hashtags: params.hashtagType ,idProcessBPM:params.idProcessBPM }, (err, ActivityComment) => {
		if (err) {
			console.log("error de en lectura hashtag " +params.hashtagType);
			count = -1;
		}
		if (!ActivityComment){
			console.log("no hay hashtags disponibles" +params.hashtagType);
			count = 0;
		}
		count = ActivityComment.length;
		console.log("finalizo lectura de hastag " +params.hashtagType);
		return 
	});
	return count;
}	

/*Retorna la cantidad total de hashtags  */
function countHashtags(req, res) {
	let count = 0;
	var hashtag ="none";
	console.log(req.params);
	if (req.params.hashtag) {
        hashtag = req.params.hashtag;
	}
	ActivityComment.find({ hashtags: hashtag}, (err, ActivityComment) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!ActivityComment) return res.status(500).send({ message: 'No hay hashtags disponibles' });
		//llama a funcion asincronica
		count = ActivityComment.length;
        return res.status(200).send({ count });
    });
}



//publico las funciones del controlador
module.exports = {
	createHashtag,
	readAllHashtags,
	countHashtags,
	countAllHashtags
}



