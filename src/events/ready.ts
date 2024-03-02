import { Client, Events } from 'discord.js';
import { IEvent } from '../types/types.js';

const event: IEvent<Client<true>> = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`.yellow.bold);
  }
};

export default event;
