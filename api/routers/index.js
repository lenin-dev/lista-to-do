import express from 'express';
import usaurio from '../routers/v1/usuarios.router.js';

export default function router(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/usuarios', usaurio);
}
