import { Client, Events } from 'discord.js';
import { IEvent } from '../types/types.js';
import colors from 'colors';

colors.enable();

const event: IEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user?.tag}`.yellow.bold);
  }
};

export default event;
