import { app } from '../core';
import { StatusCodes } from 'http-status-codes';
import Environment from './_config';

app.get('/', async (_, res) => {
  const env = await Environment.find({});
  res.status(StatusCodes.OK).json(env);
});

export default app;
