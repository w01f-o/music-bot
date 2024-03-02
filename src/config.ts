import dotenv from 'dotenv';

dotenv.config();
type TypeConfig = string | undefined;

interface IConfig {
  botToken: TypeConfig;
  clientId: TypeConfig;
  guildId: TypeConfig;
}

const config: IConfig = {
  botToken: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID
};

export default config;
