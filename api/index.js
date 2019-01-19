'use strict'

//var properties = require('mongoose');;

const APP_NAME = "BPM-SOCIAL";
const DB_NAME = "bpm_social";

console.log("Starting "+APP_NAME);
//variable que usa dependica mongoose , orm para mongo
var mongoose= require('mongoose');
//variable que usa dependica a app maneja las peticiones http y el enrutamiento
//var application = require('./app');
var port = 3800;

//conectaronos a la base datos
mongoose.Promise = global.Promise;
//,{useMongoClient:true}
mongoose.connect('mongodb://localhost:27017/'+DB_NAME)
		.then(() => {
			console.log('Successful connection to DB '+DB_NAME);
			//crear servidor
			//application.listen(3800);
			console.log("Server running Successful ok");
			
		})
		.catch(err => console.log(err));
