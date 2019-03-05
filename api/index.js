'use strict'

//var properties = require('mongoose');;

var context_properties = require('./properties');

console.log("Starting "+context_properties.APP_NAME);
//variable que usa dependica mongoose , orm para mongo
var mongoose= require('mongoose');
//variable que usa dependencia a app maneja las peticiones http y el enrutamiento
var application = require('./app');
var port = 3800;

//conextion to DDB
mongoose.Promise = global.Promise;
//,{useMongoClient:true}
mongoose.connect('mongodb://localhost:27017/'+context_properties.DB_NAME)
		.then(() => {
			console.log('Successful connection to DB '+context_properties.DB_NAME);
			//crear servidor
			application.listen(3800,()=>{
                console.log("servidor okkkk");
            });
			console.log("Server running Successful ok");
			
		})
		.catch(err => console.log(err));
