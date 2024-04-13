import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import * as middlewares from './middlewares';
import UserRouter from './Router/UserRouter';
import MessageResponse from './interfaces/MessageResponse';


require('dotenv').config();
const swaggerSpecs = require('../swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
})

app.get('/', (req, res) => {
  const message: MessageResponse = {
    message: 'Hello World!',
  };
  res.json(message);
});

app.use('/api', UserRouter);
app.use('/issues', require('./Router/IssuesRouter'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
