'use strict'

//CONTROLADOR DE Proceso - SERVICIO DE Proceso

var Process = require('../model/process');
var Activity = require('../model/activity');
var moment = require('moment');

/*Crea nuevo proceso*/

function createProcess(req, res) {
    var params = req.body;
    if (validateProcessCreate(params)) {
        var process = new Process();
        process.title = params.title;
        process.description = params.description;
        process.idProcessBPM = params.idProcessBPM;
        process.processVersion = params.processVersion;
        //process.topics = params.topics;

        //falta validar que no exita mismo id
        doCreateProcess({ process: process, params: params, res: res });

    } else {
        res.status(200).send({
            message: 'send all process fields'
        });
    }
}


/*valida los datos minimos para creacion de mensaje*/
function validateProcessCreate(p) {
    return ((p.idProcessBPM && p.processVersion && p.title && p.description));
}


/*Crea proceso pasado por parametro*/
function doCreateProcess(p) {
    var process = p.process;
    process.created_at = moment().unix();
    process.updated_at = moment().unix();
    var params = p.params;
    var res = p.res;
    process.save((err, processStored) => {
        if (err) return res.status(500).send({ message: 'error saving process' });
        if (processStored) {
            res.status(200).send({ process: processStored });
        } else {
            res.status(404).send({ message: 'unsaved process' });
        }
    })

}


/*Lee process */
function readProcess(req, res) {
    var processId = req.params.id;
    console.log(processId);
    console.log("esta leyendo");
    Process.findOne({ idProcessBPM: processId }, (err, processRead) => {
        console.log(processRead);
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if (!processRead) return res.status(404).send({ message: 'El proceso no existe' })
        return res.status(200).send({ process: processRead });
    })
}

/*Lee process */
function readProcessById(req, res) {
    var processId = req.params.id;

    Process.findById(processId, (err, processRead) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if (!processRead) return res.status(404).send({ message: 'El proceso no existe' })
        return res.status(200).send({ process: processRead });
    })
}

/*Lee todas las actividades de un proceso */
function readAllProcessActivities(req, res) {
    var processId = req.params.id;

    Activity.find({idProcessBPM:processId,processVersion:"1"},(err, actitiesStored)=>{
        if (err) return res.status(500).send({ message: 'error recuperando actividades' });
        if (!actitiesStored) {
            res.status(404).send({ message: 'error recuperando actividades' });
        } else {
            console.log("info enviada");
            res.status(200).send({ activities: actitiesStored });
        }
    })
}





//publico las funciones del controlador
module.exports = {
    createProcess,
    readProcess,
    readAllProcessActivities
}