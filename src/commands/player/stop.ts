import { useQueue } from 'discord-player';
import { SlashCommandBuilder, CommandInteraction, Guild } from 'discord.js';
import { infoEmbed } from '../../utility/embeds.js';

const commandBuilder = new SlashCommandBuilder().setName('stop').setDescription('Выгнать бота');

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();
    const interactionGuild = interaction.guild as Guild;
    const queue = useQueue(interactionGuild.id);

    queue?.delete();

    await interaction.followUp({ embeds: [infoEmbed('Бот вышел')] });
  }
};

export default command;
