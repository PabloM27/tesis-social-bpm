/*objeto con una coleccion de hashtag y un mensaje*/ 
'use strict'

var mongoose =  require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema  = mongoose.Schema;

/**
 * Modelo de Comentario
 */
var CommentSchema = Schema({
    text:String,
    emitter:{type: Schema.ObjectId,ref: 'User'},
    topic:{type: Schema.ObjectId,ref: 'Topic'},
    created_at:String
})

module.exports = mongoose.model('Comment',CommentSchema);