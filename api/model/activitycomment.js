/*objeto con una coleccion de hashtag y un mensaje*/
'use strict'

var mongoose = require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema = mongoose.Schema;

/**
 * Modelo de Activitycomments
 */
var ActivitycommentSchema = Schema({
    text: String,
    hashtags: [{ type: Schema.Types.ObjectId, ref: 'Hashtag' }],
    emitter: { type: Schema.ObjectId, ref: 'User' },
    idProcessBPM:String,
    processVersion:String,
    idActivityBPM:String,
    activity: { type: Schema.ObjectId, ref: 'Activity' },
    process: { type: Schema.ObjectId, ref: 'Process' },
    created_at: String
})

module.exports = mongoose.model('Activitycomment', ActivitycommentSchema);