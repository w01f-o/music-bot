import { Client, Collection, CommandInteraction, Events, Interaction, SlashCommandBuilder } from 'discord.js';

export interface ISlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface IExtendedClient extends Client<boolean> {
  commands?: Collection<string, ISlashCommand>;
}

export interface IEvent {
  name: Events;
  once: boolean;
  execute: (target: any) => void;
}
