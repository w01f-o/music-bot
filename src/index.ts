import { Client, GatewayIntentBits, Collection, ClientOptions } from 'discord.js';

import config from './config.js';
import { IExtendedClient, ISlashCommand } from './types/types.js';

import deployCommands from './utility/deployCommands.js';
import getCommandsFiles from './utility/getCommandsFiles.js';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import colors from 'colors';

colors.enable();

// Create the client
const clientOptions: ClientOptions = {
  intents: [GatewayIntentBits.Guilds]
};
const client: IExtendedClient = new Client(clientOptions);

// Set commands in client and deploy commands
client.commands = new Collection();

await getCommandsFiles((command: ISlashCommand) => {
  client.commands?.set(command.data.name, command);
});

await deployCommands();

// Event handling
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
  const filePath = `./events/${file}`;
  const { default: event } = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Start the bot
client.login(config.botToken);
