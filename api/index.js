'use strict'

var context_properties = require('./properties');

console.log("Starting "+context_properties.APP_NAME);
//variable que usa dependica mongoose , ORM para mongo
var mongoose= require('mongoose');
//variable que usa dependencia a app maneja las peticiones http y el enrutamiento
var application = require('./app');

//conecction to DDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/'+context_properties.DB_NAME, { useNewUrlParser: true } )
		.then(() => { { useNewUrlParser: true } 
			console.log('Successful connection to DB '+context_properties.DB_NAME);
			//crear servidor
			application.listen(context_properties.APP_PORT,()=>{
				console.log("Server running Successful ok");
            });		
		})
		.catch(err => console.log(err));
