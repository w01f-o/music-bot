import { Events } from 'discord.js';
const event = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        var _a;
        console.log(`Ready! Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`.yellow.bold);
    }
};
export default event;
