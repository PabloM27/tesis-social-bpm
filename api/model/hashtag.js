'use strict'

var mongoose =  require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema  = mongoose.Schema;

/**
 * Modelo de Hashtag
 */
var HashtagSchema = Schema({
    text:String,
    style:String,
    created_at:String
})

module.exports = mongoose.model('Hashtag',HashtagSchema);