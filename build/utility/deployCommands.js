import { REST, Routes } from 'discord.js';
import config from '../config.js';
import getCommandsFiles from './getCommandsFiles.js';
const deployCommands = async () => {
    const commands = [];
    await getCommandsFiles((command) => {
        commands.push(command.data.toJSON());
    });
    const rest = new REST().setToken(config.botToken);
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`.blue);
            const data = await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands });
            console.log(`Successfully reloaded ${data.length} application (/) commands.`.green);
        }
        catch (error) {
            console.error(`${error}`.red.bold);
        }
    })();
};
export default deployCommands;
