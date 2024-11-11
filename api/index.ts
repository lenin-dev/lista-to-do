import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { notFoundRouter, routeErrorHandling } from './middleware/err/handler.err.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT_SERVER || 3000;
app.use(express.json());
app.use(morgan('combined'));

router(app);

app.use(notFoundRouter);
app.use(routeErrorHandling);

app.listen(PORT, () => {
    console.log(`server escuchando en el puerto http://localhost:${PORT}/api/v1`);
});
