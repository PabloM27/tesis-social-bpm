'use strict'

var mongoose =  require('mongoose');

//permite mapear el objeto a un schema en base mongo
var Schema  = mongoose.Schema;

/**
 * Modelo de Usuario
 */
var UserSchema = Schema({
    name:{type:String,trim:true,default:''},
    surname:String,
	password:String,
	nick:String,
	email:String,
	role:String,
    image: String,
    created_at:String,
})

module.exports = mongoose.model('User',UserSchema);