'use strict'


var express = require('express');
var bodyParser = require('body-parser');
//variable que representa la app (abstrae ,http, enrutamientos)
var application = express();

//cargar rutas
/*var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var publication_routes = require('./routes/publication');
var message_routes = require('./routes/message')*/

//middlewares 
application.use(bodyParser.urlencoded({extended:false}));
application.use(bodyParser.json());

//cors
// configurar cabeceras http , esto sirve para que los requerimientos se validen solo a lo declarado en el metodo
// le da mas seguridad

/*application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})*/

//rutas
application.get('/',(req,res)=>{
    res.status(200).send({
        message:'Hello World'
    });
});
/*application.use('/api',user_routes);
application.use('/api',follow_routes);
application.use('/api',publication_routes);
application.use('/api',message_routes);*/

//exportar
module.exports = application;