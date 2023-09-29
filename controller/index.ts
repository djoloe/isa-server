/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500',
  })
);

const register = require('./routes/userRoute');
const avio = require('./routes/avioRoute');
const seat = require('./routes/seatRoute');
const friends = require('./routes/friendsRoute');
app.use('/', register);
app.use('/', avio);
app.use('', seat);
app.use('/', friends);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
