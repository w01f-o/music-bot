import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import getLocalTracks from '../utility/getLocalTracks.js';
const app = express();

export const startApi = () => {
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  //   app.use('/tracks', (req, res) => {
  //     res.json({ test: getLocalTracks() });
  //   });

  app.use('/tracks/sad.mp3', (req, res) => {
    res.sendFile(getLocalTracks()[1].value);
  });

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

  app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
};
