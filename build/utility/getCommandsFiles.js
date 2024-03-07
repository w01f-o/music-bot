import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const getCommandsFiles = async (callback) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const foldersPath = path.join(__dirname, '..', 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath);
        for (const file of commandFiles) {
            const filePath = `../commands/${folder}/${file}`;
            const { default: command } = await import(filePath);
            if ('data' in command && 'execute' in command) {
                callback(command);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
};
export default getCommandsFiles;
