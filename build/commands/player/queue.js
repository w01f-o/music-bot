import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { infoEmbed, queueListEmbed } from './../../utility/embeds.js';
const commandBuilder = new SlashCommandBuilder().setName('queue').setDescription('Получить список очереди');
const command = {
    data: commandBuilder,
    async execute(interaction) {
        await interaction.deferReply();
        const interactionGuild = interaction.guild;
        const queue = useQueue(interactionGuild.id);
        const tracks = queue === null || queue === void 0 ? void 0 : queue.tracks.toArray();
        (tracks === null || tracks === void 0 ? void 0 : tracks.length)
            ? await interaction.followUp({ embeds: [queueListEmbed(tracks)] })
            : await interaction.followUp({ embeds: [infoEmbed('Очередь пуста')] });
    }
};
export default command;
