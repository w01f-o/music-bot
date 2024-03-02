import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ISlashCommand } from '../types/types.js';

const command: ISlashCommand = {
  data: new SlashCommandBuilder().setName('hi').setDescription('Hi'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(`${interaction.user}, ебать ты чёрт`);
  }
};

export default command;
