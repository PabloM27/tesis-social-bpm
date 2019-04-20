'use strict'

var mongoose =  require('mongoose');
var Schema  = mongoose.Schema;

/**
 * Modelo de ActivityExecutor
 */
var ActivityExecutorSchema = Schema({
    idProcessBPM:String,
    processVersion:String,
    idActivityBPM:String,
    idCase:String,
    type:String,
    idParticipant:String,
    state:String, //EXECUTED, PENDING,
    created_at:String,
    updated_at:String
})

module.exports = mongoose.model('ActivityExecutor',ActivityExecutorSchema);