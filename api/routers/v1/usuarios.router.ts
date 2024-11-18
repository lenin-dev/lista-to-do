import express from 'express';
import pool from '../../config/postgresql/connection.js';
import Usuarios from '../../models/class/usuarios.service.js';
import Funciones_Usuario from '../../models/class/func.user.service.js';
// import Funciones from '../../models/class/funciones.service.js';

const app = express();

app.get('/',
async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);
        const resultUsuario = await usuarios.allusers();
        res.status(200).json(resultUsuario);
    } catch (error) {
        next(error);
    }
});

app.get('/:buscar',
async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);

        const { buscar } = req.params;
        const resultUsuario = await usuarios.oneusers(buscar);
        res.status(200).json(resultUsuario);
    } catch (error) {
        next(error);
    }
});

app.post('/iniciarsesion', 
async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);
        const { usuario, password } = req.body;
        await usuarios.login(usuario, password);
        res.status(200).json({
            mensaje: 'Sesión iniciada'
        });
    } catch (error) {
        next(error);
    }
});

app.post('/registrar', 
async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);
        const { usuario, password, fecha } = req.body;

        await usuarios.adduser(usuario, password, fecha);
        res.status(201).json({
            mensaje: 'Usuario creado con éxito'
        });
    } catch (error) {
        next(error);
    }
});

export default app;