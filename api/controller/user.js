'use strict'

//CONTROLADOR DE USUERIO - SERVICIO DE USUARIO

//libreria para cifrar contraseñas
var bcrypt = require('bcrypt-nodejs');
//var mongoosePaginate =require('mongoose-pagination');

//libreria de filesistem
var fs = require('fs');
var pathLibray = require('path');


//UserSchema lo da el ORM permit
var User = require('../model/user');

//var jwtService = require('../services/jwt');


//CONSTANTES
//const USERS_FILE_PATH='./uploads/users/';


//rutas
function home(req,res){
	res.status(200).send({
		message:'Home form usr controller'
	});

}


//Resitrar un nuevo usuario
function saveUser(req,res){
	var params = req.body;	
	if(validateUserCreate(params)){
		var user =  new User();
		//creo el usuario
		user.name =  params.name;
		user.surname =  params.surname;
		user.nick =  params.nick;
		user.email =  params.email;
		user.role = 'ROLE_USER';
		user.image = null;
		//validacion de existencia de usuario
		User.find({ $or:[
			{email:user.email.toLowerCase()},
			{nick:user.nick.toLowerCase()}
			]}).exec((err,readUser) => {
				if(err)return res.status(500).send({message:'error in server'});
				if(readUser && readUser.length >= 1){
					return res.status(500).send({message:'username already exists'});
				}else{
					doCreateUser({user:user,params:params,res:res});
				}				
			});

		}else{
			res.status(200).send({
				message:'send all user fields'
			});
		}
}

/*valida los datos minimos para creacion de usuario*/ 
function validateUserCreate(p){
	return (p.name && p.surname && p.nick && p.email && p.password);
}

/*Crea usuario pasado por parametro*/
function doCreateUser(p){
	var user = p.user;
	var params = p.params;
	var res = p.res;
	bcrypt.hash(params.password,null,null,(err,hash)=>{
		user.password =  hash;
		//console.log('guardara usuario');
		//console.log(user);
		user.save((err,userStored)=>{
			if(err)return res.status(500).send({message:'error guardando usuario'});

			if(userStored){
				res.status(200).send({user:userStored});

			}else{
				res.status(404).send({message: 'no se ha registrado el usuario'});
			}
		})
	});
}


//crea usuario pasado por parametro
/*function doCreateUser(p){
	var user = p.user;
	var params = p.params;
	var res = p.res;
	ServiceUser.doCreate(user,(err,pOut)=>{
		console.log("RETORNO");
		if(err)return res.status(500).send({message:'error guardando usuario'});
		if(pOut){
			res.status(500).send(pOut);

		}else{
			res.status(404).send({message: 'otro error raro'});
		}
	});
	console.log("creara usuario");
}*/





//publico las funciones del controlador
module.exports = {
	home,
	saveUser,
}



