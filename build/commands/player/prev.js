import { QueueRepeatMode, useHistory, useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { errorEmbed } from '../../utility/embeds.js';
const commandBuilder = new SlashCommandBuilder().setName('prev').setDescription('Предыдущий трек');
const command = {
    data: commandBuilder,
    async execute(interaction) {
        await interaction.deferReply();
        const interactionGuild = interaction.guild;
        const history = useHistory(interactionGuild);
        const queue = useQueue(interactionGuild.id);
        try {
            if ((queue === null || queue === void 0 ? void 0 : queue.repeatMode) !== QueueRepeatMode.TRACK) {
                await (history === null || history === void 0 ? void 0 : history.previous());
            }
            else {
                queue === null || queue === void 0 ? void 0 : queue.node.skip();
            }
        }
        catch (e) {
            return interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
        }
        await interaction.deleteReply();
    }
};
export default command;
