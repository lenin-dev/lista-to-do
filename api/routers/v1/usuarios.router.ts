import express from 'express';
import pool from '../../config/postgresql/connection.js';
import Usuarios from '../../models/class/usuarios.service.js';

const app = express();

app.get('/', async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);

        const resultado = await usuarios.allusers();        
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
});

app.post('/', async (req, res, next) => {
    try {
        const usuarios = new Usuarios(pool);
        const { usuario, password } = req.body;
        await usuarios.adduser(usuario, password);
        res.status(201).json({
            mensaje: 'Usuario creado con éxito'
        });
    } catch (error) {
        next(error);
    }
});

export default app;