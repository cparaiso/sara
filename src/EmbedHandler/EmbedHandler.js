const Discord = require('discord.js');

exports.getMarketOpenMessage = () => {
    return new Discord.MessageEmbed()
        .setColor('#00e220')
        .setTitle('🔔')
        .setDescription('STOCK MARKET IS OPEN.');
};

exports.getTenToMarketOpenMessage = () => {
    return new Discord.MessageEmbed()
        .setColor('#00e220')
        .setTitle('⏰')
        .setDescription('10 minute countdown until stock market is open.');
};

exports.getTickerSearchMessage = (response) => {
    return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(response.companyName + ' (' + response.symbol.toUpperCase() + ')')
        .setURL(`https://finance.yahoo.com/quote/${response.symbol.toUpperCase()}?p=${response.symbol.toUpperCase()}&.tsrc=fin-srch`)
        .addFields(
            { name: 'Last:', value: response.latestPrice },
            { name: 'Change:', value: response.change },
            { name: 'Change %:', value: response.changePercent },
            { name: '52 Week High:', value: response.week52High },
            { name: '52 Week Low:', value: response.week52Low }
        );
};