import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { errorEmbed, infoEmbed } from '../../utility/embeds.js';
const commandBuilder = new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Выбрать режим зацикливания')
    .addStringOption((option) => option
    .setName('mode')
    .setDescription('Режим')
    .addChoices({ name: 'По умолчанию (без цикла)', value: 'По умолчанию' }, { name: 'Зациклить текущий трек', value: 'Трек' }, { name: 'Зациклить очередь', value: 'Очередь' })
    .setRequired(true));
const command = {
    data: commandBuilder,
    async execute(interaction) {
        await interaction.deferReply();
        const interactionGuild = interaction.guild;
        const queue = useQueue(interactionGuild.id);
        const selectedMode = interaction.options.get('mode');
        try {
            switch (selectedMode === null || selectedMode === void 0 ? void 0 : selectedMode.value) {
                case 'По умолчанию':
                    queue === null || queue === void 0 ? void 0 : queue.setRepeatMode(0);
                    break;
                case 'Трек':
                    queue === null || queue === void 0 ? void 0 : queue.setRepeatMode(1);
                    break;
                case 'Очередь':
                    queue === null || queue === void 0 ? void 0 : queue.setRepeatMode(2);
                    break;
                default:
                    break;
            }
        }
        catch (e) {
            return await interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
        }
        return await interaction.followUp({ embeds: [infoEmbed('Выставлен режим цикла:', selectedMode === null || selectedMode === void 0 ? void 0 : selectedMode.value)] });
    }
};
export default command;
