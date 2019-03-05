'use strict'

var mongoose =  require('mongoose');
var Schema  = mongoose.Schema;

/**
 * Modelo de Actividad
 */
var ActivitySchema = Schema({
    idActivityBPM:String,
    title:String,
    description:String,
    publications : [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
    created_at:String,
    updated_at:String
})

module.exports = mongoose.model('Activity',ActivitySchema);