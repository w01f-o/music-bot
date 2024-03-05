import { useQueue } from 'discord-player';
import { SlashCommandBuilder, CommandInteraction, Guild, SlashCommandStringOption } from 'discord.js';
import { errorEmbed, infoEmbed } from '../../utility/embeds.js';

const commandBuilder = new SlashCommandBuilder()
  .setName('loop')
  .setDescription('Выбрать режим зацикливания')
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setName('mode')
      .setDescription('Режим')
      .addChoices(
        { name: 'По умолчанию (без цикла)', value: 'По умолчанию' },
        { name: 'Зациклить текущий трек', value: 'Трек' },
        { name: 'Зациклить очередь', value: 'Очередь' }
      )
      .setRequired(true)
  );

const command = {
  data: commandBuilder,
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const interactionGuild = interaction.guild as Guild;
    const queue = useQueue(interactionGuild.id);

    const selectedMode = interaction.options.get('mode');
    try {
      switch (selectedMode?.value) {
        case 'По умолчанию':
          queue?.setRepeatMode(0);
          break;
        case 'Трек':
          queue?.setRepeatMode(1);
          break;
        case 'Очередь':
          queue?.setRepeatMode(2);
          break;

        default:
          break;
      }
    } catch (e: any) {
      return await interaction.followUp({ embeds: [errorEmbed(`${e}`)] });
    }

    return await interaction.followUp({ embeds: [infoEmbed('Выставлен режим цикла:', selectedMode?.value as string)] });
  }
};

export default command;
