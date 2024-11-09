import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

app.use(morgan('combined'));

router(app);

app.listen(3000, () => {
    console.log('server escuchando en el puerto 3000');
});
