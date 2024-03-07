import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { infoEmbed } from '../../utility/embeds.js';
const commandBuilder = new SlashCommandBuilder().setName('stop').setDescription('Выгнать бота');
const command = {
    data: commandBuilder,
    async execute(interaction) {
        await interaction.deferReply();
        const interactionGuild = interaction.guild;
        const queue = useQueue(interactionGuild.id);
        queue === null || queue === void 0 ? void 0 : queue.delete();
        await interaction.followUp({ embeds: [infoEmbed('Бот вышел')] });
    }
};
export default command;
