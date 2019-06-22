'use strict'

//CONTROLADOR DE Publication - SERVICIO DE Publication

var Activitycomment = require('../model/activitycomment');
var moment = require('moment');

/*Crea nueva publicacion*/

function createActivitycomment(req, res) {
	var params = req.body;
	if (validateActivitycommentCreate(params)) {
        var activitycomment = new Activitycomment();
        activitycomment.text = params.text;
		activitycomment.emitter = params.emitter;
		activitycomment.idProcessBPM = params.idProcessBPM;
		activitycomment.idActivityBPM = params.idActivityBPM;
		activitycomment.hashtags = params.hashtags;
		//creo la publicaicon
	    doCreateActivitycomment({ activitycomment: activitycomment, params: params, res: res });
			
	

	} else {
		res.status(200).send({
			message: 'send all activitycomment fields'
		});
	}
}

/*valida los datos minimos para creacion de publication*/
function validateActivitycommentCreate(p) {
	return (p.text &&  p.emitter);
}


/*Crea publication pasado por parametro*/
function doCreateActivitycomment(p) {
	var activitycomment = p.activitycomment;
	activitycomment.created_at = moment().unix();
	//var params = p.params;
	var res = p.res;
	activitycomment.save((err, activitycommentStored) => {
		if (err) return res.status(500).send({ message: 'error saving activitycomment' });
		if (activitycommentStored) {
			res.status(200).send({ activitycomment: activitycommentStored });
		} else {
			res.status(404).send({ message: 'unsaved publication' });
		}
	})

}

/*lee los comentarior de una actividad*/
function getActivitycomments(req,res){

	var idProcess = req.params.idProcess;
	var idActivity= req.params.idActivity;
	//console.log("proceso"+idProcess);
	//console.log("actvidad"+idActivity);
	Activitycomment.find({idActivityBPM:idActivity,idProcessBPM:idProcess}).populate('emitter').exec((err, activitycommentStored)=>{
		if (err) return res.status(500).send({ message: 'error saving activitycomment' });
		if (activitycommentStored) {
			console.log("info enviada");
			res.status(200).send({ activitycomments: activitycommentStored });
		} else {
			res.status(404).send({ message: 'unsaved publication' });
		}
	})
}

//publico las funciones del controlador
module.exports = {
	createActivitycomment,
	getActivitycomments
}