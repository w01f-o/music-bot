import { SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from '../../types/types.js';

const command: ISlashCommand = {
  data: new SlashCommandBuilder().setName('hi').setDescription('Hi'),
  async execute(interaction) {
    await interaction.reply(`${interaction.user}, ебать ты чёрт`);
  }
};

export default command;
