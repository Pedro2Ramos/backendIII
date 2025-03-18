import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { addLogger } from './utils/logger.js';
import { errorHandler } from './middlewares/errors/errorHandler.js';

import petsRouter from './routes/pets.router.js';
import sessionsRouter from './routes/sessions.router.js';
import usersRouter from './routes/users.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret));
app.use(addLogger);

app.use('/api/pets', petsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);


connectDB();

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
}); 