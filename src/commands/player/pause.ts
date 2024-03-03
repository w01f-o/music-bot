import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ISlashCommand } from '../../types/types.js';

const command: ISlashCommand = {
  data: new SlashCommandBuilder().setName('pause').setDescription('Pause'),
  async execute(interaction: CommandInteraction) {
    interaction.reply('Pause');
  }
};

export default command;
