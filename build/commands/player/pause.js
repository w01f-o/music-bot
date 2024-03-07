import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { infoEmbed } from '../../utility/embeds.js';
const commandBuilder = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Поставить на паузу / Продолжить воспроизведение');
const command = {
    data: commandBuilder,
    async execute(interaction) {
        await interaction.deferReply();
        const interactionGuild = interaction.guild;
        const queue = useQueue(interactionGuild.id);
        if (queue === null || queue === void 0 ? void 0 : queue.isPlaying()) {
            queue === null || queue === void 0 ? void 0 : queue.node.setPaused(!queue.node.isPaused());
        }
        else {
            return interaction.followUp({ embeds: [infoEmbed('Ничего не воспроизводится')] });
        }
        await interaction.deleteReply();
    }
};
export default command;
