import express from 'express';
import pool from '../../config/postgresql/connection.js';
import Cuentas from '../../models/class/cuentas.service.js';

const app = express();

app.get('/',
async (req, res, next) => {
    try {
        const cuentas = new Cuentas(pool);
        const resultUsuario = await cuentas.allcuentas();
        res.status(200).json(resultUsuario);
    } catch (error) {
        next(error);
    }
});

app.get('/:busqueda',
async (req, res, next) => {
    try {
        const cuentas = new Cuentas(pool);
        const { busqueda } = req.params;
        const resultUsuario = await cuentas.onecuenta(busqueda);
        res.status(200).json(resultUsuario);
    } catch (error) {
        next(error);
    }
});

app.post('/',
async (req, res, next) => {
    try {
        const cuentas = new Cuentas(pool);

        const { idusuario, nombre, email, password, fechacreacion } = req.body;
        const resultUsuario = await cuentas.addcuentas(idusuario, nombre, email, password, fechacreacion);
        res.status(201).json({
            mensaje: 'Cuenta creada con exito',
            resultUsuario
        });
    } catch (error) {
        next(error);
    }
});

app.put('/:idcuentas', 
async (req, res, next) => {
    try {
        const cuentas = new Cuentas(pool);
        const { idcuentas } = req.params;
        const { idusuario, nombre, email, password, fechacreacion } = req.body
        await cuentas.updatecuentas(idcuentas, idusuario, nombre, email, password, fechacreacion);
        res.status(200).json({
            mensaje: 'Cuenta actualizada con exito'
        });
    } catch (error) {
        next(error);
    }
});

app.delete('/:idcuentas',
async (req, res, next) => {
    try {
        const cuentas = new Cuentas(pool);
        const { idcuentas } = req.body;
        await cuentas.deletecuentas(idcuentas);
        res.status(200).json({
            mensaje: 'Cuenta eliminada con exito'
        });
    } catch (error) {
        next(error);
    }
});

export default app;
