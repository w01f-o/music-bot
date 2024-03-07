import { Events } from 'discord.js';
const event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        var _a;
        if (!interaction.isChatInputCommand())
            return;
        const extendedClient = interaction.client;
        const command = (_a = extendedClient.commands) === null || _a === void 0 ? void 0 : _a.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`.red.bold);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`${error}`.red.bold);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};
export default event;
