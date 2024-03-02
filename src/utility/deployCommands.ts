import { REST, Routes } from 'discord.js';
import config from '../config.js';
import { ISlashCommand } from '../types/types.js';
import getCommandsFiles from './getCommandsFiles.js';

const deployCommands = async () => {
  const commands: object[] = [];

  await getCommandsFiles((command: ISlashCommand): void => {
    commands.push(command.data.toJSON());
  });

  const rest: REST = new REST().setToken(config.botToken as string);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`.blue);

      const data: any = await rest.put(
        Routes.applicationGuildCommands(config.clientId as string, config.guildId as string),
        { body: commands }
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`.green);
    } catch (error) {
      console.error(`${error}`.red.bold);
    }
  })();
};

export default deployCommands;
