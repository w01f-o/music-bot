import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config.js';
import colors from 'colors';

colors.enable();

const client: Client<boolean> = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`.yellow.bold);
});

client.login(config.botToken);
