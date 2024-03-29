import { GuildQueue, Track, useQueue } from 'discord-player';
import { CommandInteraction, EmbedAuthorOptions, EmbedBuilder } from 'discord.js';

const author: EmbedAuthorOptions = {
  name: 'Smokeen Lox',
  iconURL: 'https://i.imgur.com/JKdUkhO.jpg'
};

export const errorEmbed = (error: string): EmbedBuilder =>
  new EmbedBuilder().setColor(0xe32636).setTitle('Произошла ошибка😓').setDescription(error);

export const trackEmbed = (track: Track<unknown>): EmbedBuilder =>
  new EmbedBuilder()
    .setColor(0x6ea2d5)
    .setTitle('Сейчас играет: ')
    .setDescription(
      `${track.source !== 'arbitrary' ? track.toHyperlink() : track.title.replace(/\.[^/.]+$/, '')}\n\n⏲Длительность: ${track.duration}`
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

export const infoEmbed = (title: string, text?: string): EmbedBuilder =>
  new EmbedBuilder()
    .setColor(0xf1f1f1)
    .setTitle(title)
    .setDescription(text ? text : null)
    .setAuthor(author);

export const queueListEmbed = (queueList: Track[]): EmbedBuilder =>
  new EmbedBuilder()
    .setColor(0xf1f1f1)
    .setTitle('Список очереди:')
    .setDescription(
      queueList
        .map((track: Track) => (track.source !== 'arbitrary' ? track.title : track.title.replace(/\.[^/.]+$/, '')))
        .join('\n')
    )
    .setAuthor(author);
