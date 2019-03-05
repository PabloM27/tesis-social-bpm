/*objeto con una coleccion de hashtag y un mensaje*/ 
'use strict'

var mongoose =  require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema  = mongoose.Schema;

/**
 * Modelo de Publication
 */
var PublicationSchema = Schema({
    text:String,
    hashtags : [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
    emitter:{type: Schema.ObjectId,ref: 'User'},
    created_at:String
})

module.exports = mongoose.model('Publication',PublicationSchema);