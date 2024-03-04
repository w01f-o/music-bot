import { Client, Collection, CommandInteraction, Events, SlashCommandBuilder } from 'discord.js';

export interface ISlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface IExtendedClient extends Client<boolean> {
  commands?: Collection<string, ISlashCommand>;
}

export interface IEvent<T> {
  name: Events;
  once: boolean;
  execute: (target: T) => void;
}

export interface ILocalTrack {
  name: string;
  value: string;
}
