import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import * as middlewares from './middlewares';
import UserRouter from './Router/UserRouter';
import MessageResponse from './interfaces/MessageResponse';
import IssuesRouter from './Router/IssuesRouter';
import AdminRouter from './Router/adminRouter';
import { rateLimit, Store } from 'express-rate-limit'


require('dotenv').config();
const swaggerSpecs = require('../swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
  validate: true,
  standardHeaders: 'draft-6',

})
app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
}
));
app.use(cors(
  {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (process.env.ALLOWED_ORIGINS?.split(',').includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
));
app.use(express.json());
app.use(limiter)
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

app.use('/user', UserRouter);
app.use('/issues', IssuesRouter);
app.use('/admin', AdminRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
