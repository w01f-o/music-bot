import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from '../../types/types.js';

const command: ISlashCommand = {
  data: new SlashCommandBuilder().setName('play').setDescription('play'),
  async execute(interaction: CommandInteraction) {
    interaction.reply('Здарова ебать');
  }
};

export default command;
