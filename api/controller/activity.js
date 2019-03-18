'use strict'

//CONTROLADOR DE ActiviAty - SERVICIO DE Activity

var Activity = require('../model/activity');
var moment = require('moment');

/*Crea nueva actividad*/
//un cambiooo mas mas

function createActivity(req, res) {
	var params = req.body;
	if (validateActiviyCreate(params)) {
        var activity = new Activity();
        activity.idActivityBPM = params.idActivityBPM;
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


/*valida los datos minimos para creacion de mensaje*/
function validateActiviyCreate(p) {
	return ((p.idActivityBPM && p.title  && p.description ));
}


/*Crea proceso pasado por parametro*/
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


//publico las funciones del controlador
module.exports = {
	createActivity 
}