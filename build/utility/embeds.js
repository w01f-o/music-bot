import { useQueue } from 'discord-player';
import { EmbedBuilder } from 'discord.js';
const author = {
    name: 'Smokeen Lox',
    iconURL: 'https://i.imgur.com/JKdUkhO.jpg'
};
export const errorEmbed = (error) => new EmbedBuilder().setColor(0xe32636).setTitle('Произошла ошибка😓').setDescription(error);
export const trackEmbed = (track) => new EmbedBuilder()
    .setColor(0x6ea2d5)
    .setTitle('Сейчас играет: ')
    .setDescription(`${track.source !== 'arbitrary' ? track.toHyperlink() : track.title.replace(/\.[^/.]+$/, '')}\n\n⏲Длительность: ${track.duration}`)
    .setAuthor(author)
    .setThumbnail(track.source === 'youtube' ? null : track.thumbnail)
    .setImage(track.source === 'youtube' ? track.thumbnail : null);
export const queueEmbed = (track, interaction) => {
    var _a;
    const queue = useQueue((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.id);
    return new EmbedBuilder()
        .setColor(0x0f996b)
        .setTitle(track.source !== 'arbitrary' ? track.title : track.title.replace(/\.[^/.]+$/, ''))
        .setURL(track.source !== 'arbitrary' ? track.url : null)
        .setAuthor(author)
        .setDescription(`Добавлен в очередь (${track.duration})`)
        .addFields({ name: 'Треков в очереди: ', value: `${queue === null || queue === void 0 ? void 0 : queue.tracks.toArray().length}` })
        .setFooter({ text: `Добавил: ${interaction.user.displayName}`, iconURL: interaction.user.avatarURL() });
};
export const infoEmbed = (title, text) => new EmbedBuilder()
    .setColor(0xf1f1f1)
    .setTitle(title)
    .setDescription(text ? text : null)
    .setAuthor(author);
export const queueListEmbed = (queueList) => new EmbedBuilder()
    .setColor(0xf1f1f1)
    .setTitle('Список очереди:')
    .setDescription(queueList
    .map((track) => (track.source !== 'arbitrary' ? track.title : track.title.replace(/\.[^/.]+$/, '')))
    .join('\n'))
    .setAuthor(author);
