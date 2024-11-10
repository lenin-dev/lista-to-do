import express from 'express';
import usaurio from './v1/usuarios.router.js';
import { Application } from 'express-serve-static-core';

export default function router(app: Application) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/usuarios', usaurio);
}
