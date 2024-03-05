import { useQueue } from 'discord-player';
import { SlashCommandBuilder, CommandInteraction, Guild } from 'discord.js';
import { infoEmbed } from '../../utility/embeds.js';

const commandBuilder = new SlashCommandBuilder().setName('skip').setDescription('Пропустить трек');

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();
    const interactionGuild = interaction.guild as Guild;
    const queue = useQueue(interactionGuild.id);

    if (queue?.isPlaying()) {
      queue?.node.skip();
    } else {
      return interaction.followUp({ embeds: [infoEmbed('Ничего не воспроизводится')] });
    }

    await interaction.deleteReply();
  }
};

export default command;
