import { Sequelize, Model, DataTypes, QueryTypes } from 'sequelize';
import express from "express";

import { PORT } from './util/config';
import { connectToDatabase } from './util/db';

import blogsRouter from './controllers/blogs';

import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
