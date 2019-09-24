'use strict'

//CONTROLADOR DE ActiviAty - SERVICIO DE Activity
var Activity = require('../model/activity');
var Activitycomment = require('../model/activitycomment');
var moment = require('moment');

/*Crea nueva actividad*/
function createActivity(req, res) {
	var params = req.body;
	if (validateActiviyCreate(params)) {
        var activity = new Activity();
		activity.idActivityBPM = params.idActivityBPM;
		activity.idProcessBPM = params.idProcessBPM;
		activity.processVersion = params.processVersion;
        activity.title = params.title;
        activity.description = params.description; 
        //falta validar que no exita mismo id
	    doCreateActivity({ activity: activity, params: params, res: res });

	} else {
		res.status(200).send({
			message: 'send all activity fields'
		});
	}
}



/**
 *Valida los datos minimos para creacion de mensaje
 * @param {*} p 
 */
function validateActiviyCreate(p) {
	return ((p.idActivityBPM && p.idProcessBPM && p.processVersion && p.title  && p.description ));
}

/**
 * Crea proceso pasado por parametro
 * @param {*} p 
 */
function doCreateActivity(p) {
	var activity = p.activity;
    activity.created_at = moment().unix();
    activity.updated_at = moment().unix();
	var params = p.params;
	var res = p.res;
	activity.save((err, activityStored) => {
		if (err) return res.status(500).send({ message: 'error saving activity' });
		if (activityStored) {
			res.status(200).send({ process: activityStored });
		} else {
			res.status(404).send({ message: 'unsaved activity' });
		}
	})

}


/**
 * Le paso un id de actividad y retorna contadores
  cada actividad llama en paralelo y pone su valor
  en la posicion exacta del arreglo
 * @param {*} p 
 */
async function getHastagCounters(req, res) {
	let idActivityBPM ="";
	console.log(req.idActivityBPM);
	if (req.params.idActivityBPM) {
        idActivityBPM = req.params.idActivityBPM;
	}
	let activityCounters = {"idActivityBPM":0};
	let counters = {"error":0,"alerta":0,"info":0,"recomendacion":0};
	activityCounters.counters = counters;
	activityCounters.idActivityBPM =idActivityBPM;
	//podria mejorarse con un Promise.all y que se lean en paralelo
	counters.error = await countHashtagsSync({hashtagType:"error",idActivityBPM:idActivityBPM}); 
	counters.alerta = await countHashtagsSync({hashtagType:"alerta",idActivityBPM:idActivityBPM}); 
	counters.info = await countHashtagsSync({hashtagType:"info",idActivityBPM:idActivityBPM}); 
	counters.recomendacion = await countHashtagsSync({hashtagType:"recomendacion",idActivityBPM:idActivityBPM}); 
	res.status(200).send({ activityCounters });
}

async function countHashtagsSync( params) {
	let count = 0;
	await Activitycomment.find({ hashtags: params.hashtagType ,idActivityBPM:params.idActivityBPM }, (err, activityComment) => {
		if (err) {
			console.log("error de en lectura hashtag " +params.hashtagType);
			count = -1;
		}
		if (!activityComment){
			console.log("no hay hashtags disponibles" +params.hashtagType);
			count = 0;
		}
		count = activityComment.length;
		console.log("finalizo lectura de hastag " +params.hashtagType);
		return 
	});
	return count;
}

/**
 * Luego de hacer esto un nuevo servicio que dado un 
 * id de avtividad y hashtag retorna los mensajes que coinciden
 * posiblemente tenga que ir en otro servicio como activityComents
 */

async function getCommentsByHashtag(req, res) {
	let idActivityBPM ="";
	let hashtagType ="";
	//console.log(req.idActivityBPM);
	if (req.params.idActivityBPM) {
        idActivityBPM = req.params.idActivityBPM;
	}
	if (req.params.hashtag) {
        hashtagType = req.params.hashtag;
	}
	
	Activitycomment.find({ idActivityBPM: idActivityBPM, hashtags: hashtagType }).populate('emitter').exec((err, activitycommentStored) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!activitycommentStored) return res.status(404).send({ message: 'No se encontraron mensajes' });
        //console.log(activitycommentStored);
        return res.status(200).send({ activitycomments: activitycommentStored });
    })
}



//publico las funciones del controlador
module.exports = {
	createActivity,
	getHastagCounters,
	getCommentsByHashtag
}
