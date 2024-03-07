import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const getLocalTracks = () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const tracksPath = path.join(__dirname, '..', '..', 'audio');
    const tracksFiles = fs.readdirSync(tracksPath);
    return tracksFiles.map((file) => ({
        name: file.replace(/\.[^/.]+$/, ''),
        value: path.join(tracksPath, file)
    }));
};
export default getLocalTracks;
