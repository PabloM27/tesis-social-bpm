'use strict'

//CONTROLADOR DE Workflow - 

var ActivityExecutor = require('../model/activityExecutor');
var moment = require('moment');

/*Crea nuevo ActivityExecutor*/

function createActivityExecutor(req, res) {
	var params = req.body;
	//console.log(params);
	if (validateActivityExecutorCreate(params)) {
		//console.log("los datos ok!")
        var activityExecutor = new ActivityExecutor();
        activityExecutor.idProcessBPM = params.idProcessBPM;
        activityExecutor.processVersion = params.processVersion;
		activityExecutor.idActivityBPM = params.idActivityBPM;
		activityExecutor.idFormActivity = params.idFormActivity;
        activityExecutor.idCase = params.idCase;
        activityExecutor.type = "USER";
		activityExecutor.idParticipant = params.idParticipant;
		activityExecutor.state = "PENDING";
		//creo el ActivityExecutorCreate
	    doCreateActivityExecutor({ activityExecutor: activityExecutor, params: params, res: res });
	} else {
		res.status(500).send({
			message: 'send all ActivityExecutor fields'
		});
	}
}

/*valida los datos minimos para creacion de ActivityExecutor*/
function validateActivityExecutorCreate(p) {
	return (p.idProcessBPM && p.processVersion && p.idActivityBPM  && p.idCase  && p.idParticipant);
}


/*Crea ActivityExecutor pasado por parametro*/
function doCreateActivityExecutor(p) {
	var activityExecutor = p.activityExecutor;
	activityExecutor.created_at = moment().unix();
	var params = p.params;
	var res = p.res;
	activityExecutor.save((err, activityExecutorStored) => {
		if (err) return res.status(500).send({ message: 'error saving activityExecutor' });
		if (activityExecutorStored) {
			res.status(200).send({ activityExecutor: activityExecutorStored });
		} else {
			res.status(404).send({ message: 'unsaved activityExecutorStored' });
		}
	})

}


function updateActivityExecutor(req, res) {
	var params = req.body;
	if (validateActivityExecutorUpdate(params)) {
		var activityExecutor = new ActivityExecutor();
		activityExecutor._id =params._id;
        activityExecutor.idProcessBPM = params.idProcessBPM;
        activityExecutor.processVersion = params.processVersion;
		activityExecutor.idActivityBPM = params.idActivityBPM;
		activityExecutor.idFormActivity = params.idFormActivity; 
        activityExecutor.idCase = params.idCase;
        activityExecutor.type = "USER";
		activityExecutor.idParticipant = params.idParticipant;
		activityExecutor.state = "PENDING";
		//actualizo el ActivityExecutorCreate
	    doUpdateActivityExecutor({ activityExecutor: activityExecutor, params: params, res: res });
	} else {
		res.status(500).send({
			message: 'send all ActivityExecutor fields'
		});
	}
}

/*Actualiza ActivityExecutor pasado por parametro*/
function doUpdateActivityExecutor(p) {
	var activityExecutor = p.activityExecutor;
	activityExecutor.updated_at = moment().unix();
	var params = p.params;
	var res = p.res;
	ActivityExecutor.findByIdAndUpdate(activityExecutor._id,activityExecutor,{new:true},(err,activityExecutorUpdated)=>{
		if(err) return res.status(500).send({message: 'Error actualizando activityExecutor'});
		if(!activityExecutorUpdated) return res.status(500).send({message: 'No se encontro activityExecutorUpdated para actualizar'});	
		return res.status(200).send({activityExecutor:activityExecutorUpdated});

	})

}

/*valida los datos minimos para actualizar ActivityExecutor*/
function validateActivityExecutorUpdate(p) {
	return (p._id);
}

/*Lee ActivityExecutor */
function readActivityExecutorById(req,res){
	var activityExecutorId = req.params.id;
	ActivityExecutor.findById(activityExecutorId,(err,activityExecutorRead) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});

		if(!activityExecutorRead) return res.status(404).send({message:'El Ejecutor de actividad no existe'})
        
        return res.status(200).send({activityExecutor:activityExecutorRead});		
	})
}

/*Lee ActivityExecutor para el caso consultado*/
function readActivityExecutor(req,res){
	//:idProcessBPM/:processVersion/:idCase/:idActivityBPM'
	var params = req.params;
	ActivityExecutor.findOne(
		{idProcessBPM:params.idProcessBPM,
		processVersion:params.processVersion,
		idCase:params.idCase,	
		idActivityBPM:params.idActivityBPM},(err,activityExecutorRead) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'});

		if(!activityExecutorRead) return res.status(404).send({message:'El Ejecutor de actividad no existe'})
        
        return res.status(200).send(activityExecutorRead);		
	})
}

//publico las funciones del controlador
module.exports = {
	createActivityExecutor,
	updateActivityExecutor,
    readActivityExecutorById,
	readActivityExecutor
}