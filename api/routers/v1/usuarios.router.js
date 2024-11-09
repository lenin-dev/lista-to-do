import express from 'express';
import pool from '../../config/postgresql/connection.js';
import Usuarios from '../../models/class/usuarios.service.js';

const app = express();
const usuarios = new Usuarios(pool);

app.get('/', async (req, res, next) => {
    try {
        res.json('hola mundo');
    } catch (error) {
        next(error);
    }
});

export default app;