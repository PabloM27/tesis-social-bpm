'use strict'


var express = require('express');
var bodyParser = require('body-parser');
//variable que representa la app (abstrae ,http, enrutamientos)
var application = express();



//cargar rutas
var user_routes = require('./routes/user');
var hashtag_routes = require('./routes/hashtag');
var message_routes = require('./routes/message');
var topic_routes = require('./routes/topic');
var process_routes = require('./routes/process');
var activity_routes = require('./routes/activity');
var publication_routes = require('./routes/publication');

//middlewares 
application.use(bodyParser.urlencoded({extended:false}));
application.use(bodyParser.json());

//cors
// configurar cabeceras http , esto sirve para que los requerimientos se validen solo a lo declarado en el metodo
// le da mas seguridad

application.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
})

//rutas
application.get('/',(req,res)=>{
    res.status(200).send({
        message:'Hello World'
    });
});

application.use('/api',user_routes);
application.use('/api',hashtag_routes);
application.use('/api',message_routes);
application.use('/api',topic_routes);
application.use('/api',process_routes);
application.use('/api',activity_routes);
application.use('/api',publication_routes);


//exportar
module.exports = application;