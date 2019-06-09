'use strict'

//CONTROLADOR DE USUARIOS - SERVICIO DE USUARIO

//libreria para cifrar contraseñas
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

//libreria de filesistem
var fs = require('fs');
var pathLibray = require('path');

//UserSchema lo da el ORM permit
var User = require('../model/user');

var jwtService = require('../services/jwt');
//CONSTANTES
//const USERS_FILE_PATH='./uploads/users/';


//rutas
function home(req, res) {
    res.status(200).send({
        message: 'Home form usr controller'
    });

}


//Resitrar un nuevo usuario
function saveUser(req, res) {
    var params = req.body;
    if (validateUserCreate(params)) {
        var user = new User();
        //creo el usuario
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        //validacion de existencia de usuario
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, readUser) => {
            if (err) return res.status(500).send({ message: 'error in server' });
            if (readUser && readUser.length >= 1) {
                return res.status(500).send({ message: 'username already exists' });
            } else {
                doCreateUser({ user: user, params: params, res: res });
            }
        });

    } else {
        res.status(200).send({
            message: 'send all user fields'
        });
    }
}

/*valida los datos minimos para creacion de usuario*/
function validateUserCreate(p) {
    return (p.name && p.surname && p.nick && p.email && p.password);
}

/*Crea usuario pasado por parametro*/
function doCreateUser(p) {
    var user = p.user;
    var params = p.params;
    var res = p.res;
    bcrypt.hash(params.password, null, null, (err, hash) => {
        user.password = hash;
        user.save((err, userStored) => {
            if (err) return res.status(500).send({ message: 'error guardando usuario' });

            if (userStored) {
                res.status(200).send({ user: userStored });

            } else {
                res.status(404).send({ message: 'no se ha registrado el usuario' });
            }
        })
    });
}

/*
Login de usuario
*/

/*
Login de usuario
*/
function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var nick = params.nick;
    var password = params.password;
    console.log("login hola ");
    console.log("login email " + params.email);
    console.log("login pass " + params.password);
    User.findOne({ email: email }, (err, readUser) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        console.log(readUser);
        if (readUser) {
            bcrypt.compare(password, readUser.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        //generar y retornar token
                        return res.status(200).send({
                            token: jwtService.createToken(readUser)
                        });
                    } else {
                        //retonar datos de usuario
                        readUser.password = undefined;
                        return res.status(200).send({ readUser });
                    }
                } else {
                    return res.status(404).send({ message: 'Error usuario o password incorrecta' });
                }
            })
        } else {
            return res.status(404).send({ message: 'Error el usuario no se pudo identificar!' });
        }
    });
}


/*Lee usuario */

function readUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, userRead) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!userRead) return res.status(404).send({ message: 'El usuario no existe' });
        //no enviamos la pass al cliente
        userRead.password = undefined;
        return res.status(200).send({ user: userRead });
    })
}

/*Retorna todos los usuarios sin paginar */

function readAllUsers(req, res) {
    //recuperamosa todos,pero no enviamos la pass
    User.find({}, { password: 0 }, (err, users) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!users) return res.status(500).send({ message: 'No hay usuarios disponibles' });
        //llama a funcion asincronica
        return res.status(200).send({ users });
    });
}

/*Retorna usuarios paginados */

function readUsers(req, res) {
    //var identity_user_id = req.user.sub;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 3;
    //recuperamosa todos,pero no enviamos la pass
    User.find({}, { password: 0 }).sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!users) return res.status(500).send({ message: 'No hay usuarios disponibles' });
        //llama a funcion asincronica
        return res.status(200).send({ //podria usar usersenviados: users , si no pongo nada tomo el mismo
            users,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}



//publico las funciones del controlador
module.exports = {
    home,
    loginUser,
    saveUser,
    readUser,
    readUsers,
    readAllUsers
}