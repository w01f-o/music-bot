import express from 'express';
import getLocalTracks from '../utility/getLocalTracks.js';
const app = express();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
class Track {
    constructor(name, author, urlIndex) {
        this.name = name;
        this.author = author;
        this.id = name === 'Love is' ? 4534 : Math.round(Math.random() * 10000);
        this.urlIndex = urlIndex;
    }
}
export const startApi = () => {
    app.use(express.json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const tracksPath = path.join(__dirname, '..', '..', 'audio');
    const tracksFiles = fs.readdirSync(tracksPath);
    const tracks = tracksFiles.map((track, index) => new Track(track.split(' - ')[1].replace(/\.[^/.]+$/, ''), track.split(' - ')[0], index));
    app.use('/api/tracks/:trackIndex.mp3', (req, res) => {
        const trackIndex = req.params.trackIndex;
        res.sendFile(getLocalTracks()[+trackIndex].value);
    });
    app.use('/api/tracks', (req, res) => {
        res.json({ tracks: tracks });
    });
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8222;
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
};
