import { Track, useQueue } from 'discord-player';
import { SlashCommandBuilder, CommandInteraction, Guild } from 'discord.js';
import { infoEmbed, queueListEmbed } from './../../utility/embeds.js';

const commandBuilder = new SlashCommandBuilder().setName('queue').setDescription('Получить список очереди');

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const interactionGuild = interaction.guild as Guild;
    const queue = useQueue(interactionGuild.id);

    const tracks: Track[] | undefined = queue?.tracks.toArray();

    tracks?.length
      ? await interaction.followUp({ embeds: [queueListEmbed(tracks)] })
      : await interaction.followUp({ embeds: [infoEmbed('Очередь пуста')] });
  }
};

export default command;
