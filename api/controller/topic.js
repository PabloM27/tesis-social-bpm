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
        topic.process = params.process;
        topic.owner = params.owner;
        //topic.comments = params.comments;
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
    return (p.title && p.description && p.process);
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



/*Lee Topico */
function readTopic(req, res) {
    var topicId = req.params.id;
    Topic.findOne({ _id: topicId }).populate('owner').exec((err, topicRead) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!topicRead) return res.status(404).send({ message: 'El topico no existe' })
        return res.status(200).send({ topic: topicRead });
    })
}


/*Lee Topico populado */
function readTopicFull(req, res) {
    var topicId = req.params.id;

    Topic.findById(topicId, (err, topicRead) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!topicRead) return res.status(404).send({ message: 'El topico no existe' })
        return res.status(200).send({ topic: topicRead });
    }).populate('comments');
}


/*Lee los topicos paginados */
/*Retorna usuarios paginados */
/*
function readTopics(req, res) {

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 3;
    //recuperamosa todos,pero no enviamos la pass
    Topic.find().sort('_id').paginate(page, itemsPerPage, (err, topics, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!topics) return res.status(500).send({ message: 'No hay topicos disponibles' });

        return res.status(200).send({
            topics,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}*/

function readTopics(req, res) {
    var xIdProcess = req.params.idProcess;

    Topic.find({ process: xIdProcess }).populate('owner').exec((err, topicRead) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!topicRead) return res.status(404).send({ message: 'El topico no existe' });
        console.log(topicRead);
        return res.status(200).send({ topics: topicRead });
    })
}


//publico las funciones del controlador
module.exports = {
    createTopic,
    readTopic,
    readTopicFull,
    readTopics
}