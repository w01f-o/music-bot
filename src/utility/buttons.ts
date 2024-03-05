import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const currentTrackButtons = (): ActionRowBuilder<ButtonBuilder> => {
  const prevTrack = new ButtonBuilder().setCustomId('prev').setLabel('⏪').setStyle(ButtonStyle.Secondary);
  const nextTrack = new ButtonBuilder().setCustomId('next').setLabel('⏩').setStyle(ButtonStyle.Secondary);
  const viewQueue = new ButtonBuilder().setCustomId('queue').setLabel('📋 Очередь').setStyle(ButtonStyle.Secondary);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(prevTrack, nextTrack, viewQueue);
};
