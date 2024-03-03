import { Track } from 'discord-player';
import { EmbedBuilder } from 'discord.js';

export const errorEmbed = (title: string): EmbedBuilder => new EmbedBuilder().setColor(0xe32636).setTitle(title);

export const trackEmbed = (track: Track<unknown>): EmbedBuilder =>
  new EmbedBuilder().setColor(0x6ea2d5).setTitle(track.title).setImage(track.thumbnail);

export const queueEmbed = (track: Track<unknown>): EmbedBuilder =>
  new EmbedBuilder().setColor(0x0f996b).setTitle(`${track.title} добавлен в очередь`);
