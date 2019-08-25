'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Modelo de Topico
 */
var TopicSchema = Schema({
    title: String,
    description: String,
    process: [{ type: Schema.Types.ObjectId, ref: 'Process' }],
    owner: { type: Schema.ObjectId, ref: 'User' },
    created_at: String,
    updated_at: String
})

module.exports = mongoose.model('Topic', TopicSchema);