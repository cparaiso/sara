const Discord = require('discord.js');

exports.getMarketOpenMessage = () => {
    return new Discord.MessageEmbed()
        .setColor('#30a85f')
        .setTitle('🔔')
        .setDescription('STOCK MARKET IS OPEN. GET THAT MONEY...');
};

exports.getTenToMarketOpenMessage = () => {
    return new Discord.MessageEmbed()
        .setColor('#30a85f')
        .setTitle('⏰')
        .setDescription('10 minute countdown until stock market is open.');
};

exports.getTickerSearchMessage = (response) => {
    return new Discord.MessageEmbed()
        .setColor('#30a85f')
        .setTitle(response.companyName + ' (' + response.symbol.toUpperCase() + ')')
        .setURL(`https://finance.yahoo.com/quote/${response.symbol.toUpperCase()}?p=${response.symbol.toUpperCase()}&.tsrc=fin-srch`)
        .addFields(
            { name: 'Last:', value: response.latestPrice },
            { name: 'Change:', value: response.change },
            { name: 'Change %:', value: response.changePercent },
            { name: '52 Week High:', value: response.week52High },
            { name: '54 Week Loow:', value: response.week52Low }
        );
};

exports.getNewsMessage = (response, ticker) => {
    let msg = ``;
    let title = '';

    if (ticker) {
        title = `Latest ${ticker.toUpperCase()} News`;
    } else {
        title = `Latest Market News`;
    }

    response.forEach(data => {
        msg += `[${data.headline}](${data.url})\n\n`;
    });

    return new Discord.MessageEmbed()
        .setColor('#30a85f')
        .setTitle(title)
        .setDescription(msg);
};