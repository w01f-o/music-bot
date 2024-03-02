import { Events, Interaction, CommandInteraction } from 'discord.js';
import { IEvent, IExtendedClient } from '../types/types.js';
import colors from 'colors';

colors.enable();

const event: IEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const extendedClient = interaction.client as IExtendedClient;
    const command = extendedClient.commands?.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};

export default event;
