import { SlashCommandBuilder } from 'discord.js';
import { errorEmbed, infoEmbed, queueEmbed } from '../../utility/embeds.js';
import { QueryType, useMainPlayer } from 'discord-player';
import getLocalTracks from '../../utility/getLocalTracks.js';
const commandBuilder = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Запустить трек')
    .addSubcommand((subcomand) => subcomand
    .setName('local')
    .setDescription('Наши треки')
    .addStringOption((option) => option
    .setName('track')
    .setDescription('Трек')
    .addChoices(...getLocalTracks())
    .setRequired(true)))
    .addSubcommand((subcomand) => subcomand
    .setName('url')
    .setDescription('Треки по ссылке (Youtube, Apple music, Spotify, SoundCloud или текстовый запрос)')
    .addStringOption((option) => option.setName('url').setDescription('Ссылка или запрос').setRequired(true)));
const command = {
    data: commandBuilder,
    async execute(interaction) {
        var _a;
        const member = interaction.member;
        const voiceChannel = member.voice.channel;
        if (!voiceChannel)
            return await interaction.reply({
                embeds: [infoEmbed('Вы должны находиться в голосовом канале, чтобы я смог к вам зайти')]
            });
        const player = useMainPlayer();
        await interaction.deferReply();
        const requestTrack = (_a = interaction.options.get('url')) !== null && _a !== void 0 ? _a : interaction.options.get('track');
        try {
            const { track } = await player.play(voiceChannel, requestTrack === null || requestTrack === void 0 ? void 0 : requestTrack.value, {
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 120000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 120000
                },
                searchEngine: interaction.options.get('track') ? QueryType.FILE : QueryType.AUTO
            });
            return interaction.followUp({ embeds: [queueEmbed(track, interaction)] });
        }
        catch (e) {
            console.error(e);
            return interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
        }
    }
};
export default command;
