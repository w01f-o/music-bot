import { Client, GatewayIntentBits, Collection } from 'discord.js';
import config from './config.js';
import deployCommands from './utility/deployCommands.js';
import getCommandsFiles from './utility/getCommandsFiles.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import colors from 'colors';
import { Player } from 'discord-player';
import playerEvents from './events/player/playerEvents.js';
colors.enable();
const clientOptions = {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
};
const client = new Client(clientOptions);
const player = new Player(client, {
    skipFFmpeg: false,
    ytdlOptions: {
        quality: 'highestaudio',
        filter: 'audioonly',
        highWaterMark: 1 << 25
    }
});
await player.extractors.loadDefault();
client.commands = new Collection();
await getCommandsFiles((command) => {
    var _a;
    (_a = client.commands) === null || _a === void 0 ? void 0 : _a.set(command.data.name, command);
});
await deployCommands();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientEventsPath = path.join(__dirname, 'events', 'client');
const clientEventFiles = fs.readdirSync(clientEventsPath);
for (const file of clientEventFiles) {
    const filePath = `./events/client/${file}`;
    const { default: event } = await import(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
playerEvents();
client.login(config.botToken);
