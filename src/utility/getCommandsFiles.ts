import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getCommandsFiles = async (callback: Function) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const foldersPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(foldersPath);

  for (const file of commandFiles) {
    const filePath = `../commands/${file}`;
    const { default: command } = await import(filePath);

    if ('data' in command && 'execute' in command) {
      callback(command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
};

export default getCommandsFiles;
