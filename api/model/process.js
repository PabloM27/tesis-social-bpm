'use strict'

var mongoose =  require('mongoose');
var Schema  = mongoose.Schema;

/**
 * Modelo de Proceso
 */
var ProcessSchema = Schema({
    idProcessBPM:String,
    idVersionBPM:String,
    title:String,
    description:String,
    topics : [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    created_at:String,
    updated_at:String
    //faltaria agregar un estado
})

module.exports = mongoose.model('Process',ProcessSchema);