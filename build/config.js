import dotenv from 'dotenv';
dotenv.config();
const config = {
    botToken: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID
};
export default config;
