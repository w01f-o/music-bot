import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ILocalTrack } from '../types/types.js';

const getLocalTracks = (): ILocalTrack[] => {
  const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
  const tracksPath: string = path.join(__dirname, '..', '..', 'audio');
  const tracksFiles: string[] = fs.readdirSync(tracksPath);

  return tracksFiles.map(
    (file: string): ILocalTrack => ({
      name: file.replace(/\.[^/.]+$/, ''),
      value: path.join(tracksPath, file)
    })
  );
};

export default getLocalTracks;
