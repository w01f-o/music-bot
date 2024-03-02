import { SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from '../../types/types.js';

const command: ISlashCommand = {
  data: new SlashCommandBuilder().setName('test').setDescription('Test'),
  async execute(interaction) {
    interaction.reply('Test!');
  }
};

export default command;
