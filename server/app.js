import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import classRoute from './routes/classRoute.js';
import membershipRoute from './routes/membershipRoute.js';
import planRoute from './routes/planRoute.js';
import bookingRoute from './routes/bookingRoute.js';

import { globalErrorHandler } from './controllers/errorController.js';
const app = express();

app.use(
  // allow react to call this file(express api)
  cors({
    origin: 'http://localhost:5173', // Vite React app
    credentials: true, // allow cookies
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser()); //this method from cookie-parser package - parse the cookeis into req.cookies

app.use(express.json()); // parse JSON bodies

//-- INITIALIZING SUBS ROUTE HANDLER--
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/memberships', membershipRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/classes', classRoute);
app.use('/api/v1/plans', planRoute);

//---------------ERROR HANDLER: must be the last middleware-----------------
app.use(globalErrorHandler);

export default app;
