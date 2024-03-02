import { Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface ISlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface IExtendedClient extends Client<boolean> {
  commands?: Collection<string, ISlashCommand>;
}
