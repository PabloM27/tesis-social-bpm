'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'remo_y_rita';

//estos son los datos que quiero cifrar en el token
exports.createToken = function (user){
	var payload = {
		sub: user._id, // sub signigica subject standar
		name: user.name,
		surname : user.surname,
		nick:user.nick,
		email : user.email,
		role :  user.role,
		image:user.image,
		iat:moment().unix(), //dentifies the time at which the JWT was issued. emitido
		exp:moment().add(30,'days').unix //exp expiration time
	};

	return jwt.encode(payload,secretKey)
};

//publico las funciones del controlador
/*module.exports = {
	createToken
}*/