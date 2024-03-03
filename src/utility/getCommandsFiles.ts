import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getCommandsFiles = async (callback: Function) => {
  const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

  const foldersPath: string = path.join(__dirname, '..', 'commands');
  const commandFolders: string[] = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath);

    for (const file of commandFiles) {
      const filePath = `../commands/${folder}/${file}`;

      const { default: command } = await import(filePath);

      if ('data' in command && 'execute' in command) {
        callback(command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
};

export default getCommandsFiles;
