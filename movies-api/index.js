import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import './db';
import './seedData';
import usersRouter from './api/users';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

//Users router
app.use('/api/users', usersRouter);