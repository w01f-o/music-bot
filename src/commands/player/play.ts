import {
  SlashCommandBuilder,
  CommandInteraction,
  GuildMember,
  VoiceChannel,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
  CommandInteractionOption
} from 'discord.js';
import { errorEmbed, queueEmbed, trackEmbed } from '../../utility/embeds.js';
import { Player, Track, useMainPlayer } from 'discord-player';

const commandBuilder = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play')
  .addStringOption((option: SlashCommandStringOption) =>
    option.setName('track').setDescription('track').setRequired(true)
  );

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel as VoiceChannel;

    if (!voiceChannel)
      return await interaction.reply({
        embeds: [errorEmbed('Вы должны находиться в голосовом канале, чтобы я смог к вам зайти')]
      });

    const player: Player = useMainPlayer();

    await interaction.deferReply();
    const optionTrack: CommandInteractionOption | null = interaction.options.get('track');

    player.events.on('playerStart', (queue, track) => {
      queue.metadata.channel.send({ embeds: [trackEmbed(track)] });
    });

    try {
      const { track } = await player.play(voiceChannel, optionTrack?.value as string, {
        nodeOptions: {
          metadata: interaction
        }
      });
      // console.log(track);

      return interaction.followUp({ embeds: [queueEmbed(track)] });
    } catch (e: any) {
      console.error(e);
      return interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
    }
  }
};

export default command;
