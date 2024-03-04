import { GuildQueue, Track, useQueue } from 'discord-player';
import { CommandInteraction, EmbedAuthorOptions, EmbedBuilder } from 'discord.js';

const author: EmbedAuthorOptions = {
  name: 'Beat Brewer',
  iconURL: 'https://i.imgur.com/1tfsB88.png'
};

export const errorEmbed = (error: string): EmbedBuilder =>
  new EmbedBuilder().setColor(0xe32636).setTitle('Произошла непредвиденная ошибка😓').setDescription(error);

export const trackEmbed = (track: Track<unknown>, interaction: CommandInteraction): EmbedBuilder =>
  new EmbedBuilder()
    .setColor(0x6ea2d5)
    .setTitle('Сейчас играет: ')
    .setDescription(
      `${track.source !== 'arbitrary' ? track.toHyperlink() : track.title.replace(/\.[^/.]+$/, '')}\n\n⏲Длительность: ${track.duration}\n👀Трек поставил: ${interaction.user}`
    )
    .setAuthor(author)
    .setThumbnail(track.source === 'youtube' ? null : track.thumbnail)
    .setImage(track.source === 'youtube' ? track.thumbnail : null);

export const queueEmbed = (track: Track<unknown>, interaction: CommandInteraction): EmbedBuilder => {
  const queue: GuildQueue | null = useQueue(interaction.guild?.id as string);
  return new EmbedBuilder()
    .setColor(0x0f996b)
    .setTitle(track.source !== 'arbitrary' ? track.title : track.title.replace(/\.[^/.]+$/, ''))
    .setURL(track.source !== 'arbitrary' ? track.url : null)
    .setAuthor(author)
    .setDescription(`Добавлен в очередь (${track.duration})`) //🎵
    .addFields({ name: 'Треков в очереди: ', value: `${queue?.tracks.toArray().length}` })
    .setFooter({ text: `Добавил: ${interaction.user.displayName}`, iconURL: interaction.user.avatarURL() as string });
};
