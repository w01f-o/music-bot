import { REST, Routes } from 'discord.js';
import config from '../config.js';
import { ISlashCommand } from '../types/types.js';
import getCommandsFiles from './getCommandsFiles.js';

const deployCommands = async () => {
  const commands: any[] = [];

  await getCommandsFiles((command: ISlashCommand) => {
    commands.push(command.data.toJSON());
  });

  const rest = new REST().setToken(config.botToken as string);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data: any = await rest.put(
        Routes.applicationGuildCommands(config.clientId as string, config.guildId as string),
        { body: commands }
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  })();
};

export default deployCommands;
