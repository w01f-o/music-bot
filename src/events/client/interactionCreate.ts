import { Events, CommandInteraction } from 'discord.js';
import { IEvent, IExtendedClient } from '../../types/types.js';

const event: IEvent<CommandInteraction> = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const extendedClient = interaction.client as IExtendedClient;
    const command = extendedClient.commands?.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`.red.bold);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`${error}`.red.bold);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};

export default event;
