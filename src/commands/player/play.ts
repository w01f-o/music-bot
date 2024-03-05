import {
  SlashCommandBuilder,
  CommandInteraction,
  GuildMember,
  VoiceChannel,
  SlashCommandStringOption,
  CommandInteractionOption,
  SlashCommandSubcommandBuilder
} from 'discord.js';
import { errorEmbed, infoEmbed, queueEmbed } from '../../utility/embeds.js';
import { Player, QueryType, useMainPlayer } from 'discord-player';
import getLocalTracks from '../../utility/getLocalTracks.js';

const commandBuilder = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Запустить трек')
  .addSubcommand((subcomand: SlashCommandSubcommandBuilder) =>
    subcomand
      .setName('local')
      .setDescription('Наши треки')
      .addStringOption((option: SlashCommandStringOption) =>
        option
          .setName('track')
          .setDescription('Трек')
          .addChoices(...getLocalTracks())
          .setRequired(true)
      )
  )
  .addSubcommand((subcomand: SlashCommandSubcommandBuilder) =>
    subcomand
      .setName('url')
      .setDescription(
        'Треки по ссылке (Youtube, Apple music, Spotify, SoundCloud, Яндекс музыка (NW) или текстовый запрос)'
      )
      .addStringOption((option: SlashCommandStringOption) =>
        option.setName('url').setDescription('Ссылка или запрос').setRequired(true)
      )
  );

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel as VoiceChannel;

    if (!voiceChannel)
      return await interaction.reply({
        embeds: [infoEmbed('Вы должны находиться в голосовом канале, чтобы я смог к вам зайти')]
      });

    const player: Player = useMainPlayer();

    await interaction.deferReply();

    const requestTrack: CommandInteractionOption | null =
      interaction.options.get('url') ?? interaction.options.get('track');

    try {
      const { track } = await player.play(voiceChannel, requestTrack?.value as string, {
        nodeOptions: {
          metadata: interaction,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 30000
        },
        searchEngine: interaction.options.get('track') ? QueryType.FILE : QueryType.AUTO
      });

      return interaction.followUp({ embeds: [queueEmbed(track, interaction)] });
    } catch (e: any) {
      console.error(e);
      return interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
    }
  }
};

export default command;
