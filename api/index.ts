import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routers/index.js';
import { notFoundRouter, routeErrorHandling } from './middleware/err/handler.err.js';

const app = express();
app.use(express.json());

app.use(morgan('combined'));

router(app);

app.use(notFoundRouter);
app.use(routeErrorHandling);

app.listen(3000, () => {
    console.log('server escuchando en el puerto 3000');
});
