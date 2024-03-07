import { GuildQueue, Player, Track, useMainPlayer } from 'discord-player';
import { TextChannel } from 'discord.js';
import { trackEmbed, infoEmbed } from '../../utility/embeds.js';

const playerEvents = (): void => {
  const player: Player = useMainPlayer();

  player.events.on('playerStart', async (queue: GuildQueue<any>, track: Track<unknown>) => {
    const textChannel = queue.metadata?.channel as TextChannel;
    await textChannel.send({
      embeds: [trackEmbed(track)]
    });
  });

  player.events.on('playerError', (queue, e) => {
    console.error(e);
  });

  player.events.on('error', (queue, e) => {
    console.error(e);
  });

  player.events.on('disconnect', async (queue) => {
    const textChannel = queue.metadata?.channel as TextChannel;
    await textChannel.send({ embeds: [infoEmbed('Моя работа окончена, я пошёл!')] });
  });

  player.events.on('emptyChannel', async (queue) => {
    const textChannel = queue.metadata?.channel as TextChannel;
    await textChannel.send({
      embeds: [infoEmbed('Выхожу, потому-что в голосом канале нет активности в течении 2-ух минут')]
    });
  });

  player.events.on('emptyQueue', async (queue) => {
    const textChannel = queue.metadata?.channel as TextChannel;
    await textChannel.send({ embeds: [infoEmbed('Очередь пуста')] });
  });
};

export default playerEvents;
