import express from "express";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import { connectToDatabase } from './config/db.config';
import './util/passport';

import loginRouter from './controllers/auth.controller';
import blogsRouter from './controllers/blog.controller';
import usersRouter from './controllers/user.controller';

import errorHandler from './middlewares/errorHandler';

import { PORT, SECRET } from './config/env.config';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
};

start();
