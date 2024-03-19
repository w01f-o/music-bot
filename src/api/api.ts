import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import getLocalTracks from '../utility/getLocalTracks.js';
const app = express();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class Track {
  name: string;
  author: string;
  id: number;
  url: string;

  constructor(name: string, author: string, url: string) {
    this.name = name;
    this.author = author;
    this.id = Math.round(Math.random() * 10000);
    this.url = url;
  }
}

export const startApi = () => {
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
  const tracksPath: string = path.join(__dirname, '..', '..', 'audio');
  const tracksFiles: string[] = fs.readdirSync(tracksPath);

  const tracks: Track[] = tracksFiles.map(
    (track: string, index: number) =>
      new Track(
        track.split(' - ')[0],
        track.split(' - ')[1].replace(/\.[^/.]+$/, ''),
        `http://localhost:8000/api/tracks/${index}.mp3`
      )
  );

  app.use('/api/tracks/:trackIndex.mp3', (req, res) => {
    const trackIndex = req.params.trackIndex;
    res.sendFile(getLocalTracks()[+trackIndex].value);
  });

  app.use('/api/tracks', (req, res) => {
    res.json({ tracks: tracks });
  });

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

  app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
};
