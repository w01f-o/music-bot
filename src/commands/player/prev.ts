import { QueueRepeatMode, useHistory, useQueue } from 'discord-player';
import { SlashCommandBuilder, CommandInteraction, Guild } from 'discord.js';
import { errorEmbed } from '../../utility/embeds.js';

const commandBuilder = new SlashCommandBuilder().setName('prev').setDescription('Предыдущий трек');

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const interactionGuild = interaction.guild as Guild;
    const history = useHistory(interactionGuild);
    const queue = useQueue(interactionGuild.id);

    try {
      if (queue?.repeatMode !== QueueRepeatMode.TRACK) {
        await history?.previous();
      } else {
        queue?.node.skip();
      }
    } catch (e) {
      return interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
    }

    await interaction.deleteReply();
  }
};

export default command;
