import { Client, Events, GatewayIntentBits, Collection, ClientOptions, Interaction } from 'discord.js';
import config from './config.js';
import colors from 'colors';
import { IExtendedClient, ISlashCommand } from './types/types.js';
import deployCommands from './utility/deploy-commands.js';
import getCommandsFiles from './utility/getCommandsFiles.js';

colors.enable();

const clientOptions: ClientOptions = {
  intents: [GatewayIntentBits.Guilds]
};
const client: IExtendedClient = new Client(clientOptions);

client.commands = new Collection();

await getCommandsFiles((command: ISlashCommand) => {
  client.commands?.set(command.data.name, command);
});

await deployCommands();

//Launching the bot
client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user?.tag}`.yellow.bold);
});

client.login(config.botToken);

//Command handling
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const extendedClient = interaction.client as IExtendedClient;
  const command = extendedClient.commands?.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
