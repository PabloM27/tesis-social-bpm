'use strict'

var mongoose =  require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema  = mongoose.Schema;

/**
 * Modelo de Mensaje
 */
var MessageSchema = Schema({
    text:String,
    emitter:{type: Schema.ObjectId,ref: 'User'},
    created_at:String
})

module.exports = mongoose.model('Message',MessageSchema);