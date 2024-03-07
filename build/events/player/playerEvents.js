import { useMainPlayer } from 'discord-player';
import { trackEmbed, infoEmbed } from '../../utility/embeds.js';
const playerEvents = () => {
    const player = useMainPlayer();
    player.events.on('playerStart', async (queue, track) => {
        var _a;
        const textChannel = (_a = queue.metadata) === null || _a === void 0 ? void 0 : _a.channel;
        await textChannel.send({
            embeds: [trackEmbed(track)]
        });
    });
    player.events.on('playerError', (queue, e) => {
        console.error(e);
    });
    player.events.on('error', (queue, e) => {
        console.error(e);
    });
    player.events.on('disconnect', async (queue) => {
        var _a;
        const textChannel = (_a = queue.metadata) === null || _a === void 0 ? void 0 : _a.channel;
        await textChannel.send({ embeds: [infoEmbed('Моя работа окончена, я пошёл!')] });
    });
    player.events.on('emptyChannel', async (queue) => {
        var _a;
        const textChannel = (_a = queue.metadata) === null || _a === void 0 ? void 0 : _a.channel;
        await textChannel.send({
            embeds: [infoEmbed('Выхожу, потому-что в голосом канале нет активности в течении 2-ух минут')]
        });
    });
    player.events.on('emptyQueue', async (queue) => {
        var _a;
        const textChannel = (_a = queue.metadata) === null || _a === void 0 ? void 0 : _a.channel;
        await textChannel.send({ embeds: [infoEmbed('Очередь пуста')] });
    });
};
export default playerEvents;
