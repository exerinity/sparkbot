module.exports = {
    name: 'time',
    description: 'Get the current time in a timezone',
    async execute(bot, message, args) {
        try {
            const currentTime = new Date();
            const utcOffset = args[0] ? parseInt(args[0]) : 0;
            if (isNaN(utcOffset)) {
                message.channel.send('invalid offset -- example:\n`s!time -5` - UTC-5\n`s!time 8` - UTC+8');
                return;
            }
            const timeWithOffset = new Date(currentTime.getTime() + (utcOffset * 60 * 60 * 1000));
            const hours = timeWithOffset.getUTCHours();
            const minutes = timeWithOffset.getUTCMinutes();
            const ampm = hours >= 12 ? 'P' : 'A';
            const formattedTime = `${timeWithOffset.getUTCFullYear()}-${(timeWithOffset.getUTCMonth() + 1).toString().padStart(2, '0')}-${timeWithOffset.getUTCDate().toString().padStart(2, '0')} ${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            message.channel.send(`${formattedTime}M`);
        } catch (error) {
            console.warn('An error occurred while getting the current time:', error);
            message.channel.send('An error occurred while getting the current time. Please try again later.');
        }
    }
}