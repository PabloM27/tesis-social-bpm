'use strict'

var jwt =  require('jwt-simple');
var moment = require('moment');

var secretKey = 'remo_y_rita';

exports.ensureAuth = function(req,res,next){
	//authorization campi standar en una peticion http
	if(!req.headers.authorization){
		return res.status(403).send({message: 'la peticion no tiene cabecera de authorization'})
	}
	var token = req.headers.authorization.replace(/['"]+/g,'');
	try{
		var payload = jwt.decode(token,secretKey);
		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				message:'El token ha expirado'
			})
		}

	}catch(ex){
		return res.status(404).send({
			message:'El token no es valido'
		});
	}
	//se recupera el usuario a partir del token
	//se lo agrega al request para que este disponible en toda funcion posterior
	req.user = payload;
	next(); 
}