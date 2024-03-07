import { SlashCommandBuilder } from 'discord.js';
const commandBuilder = new SlashCommandBuilder()
    .setName('hi')
    .setDescription('Hi')
    .addUserOption((option) => option.setName('user').setDescription('Выбери чорта').setRequired(false));
const command = {
    data: commandBuilder,
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        await interaction.reply(`${targetUser || interaction.user}, ебать ты чорт`);
    }
};
export default command;
