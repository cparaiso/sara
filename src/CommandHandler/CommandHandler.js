const WebScraper = require('../WebScraperModel/WebScraperModel.js');
const StockModel = require('../StockModel/StockModel.js');
const Discord = require('discord.js');
const EmbedHandler = require('../EmbedHandler/EmbedHandler.js');

exports.handleCommand = async (command, message, args) => {
    if (command === 'ping') {
        message.channel.send('Pong.');
    } else if (command === 'beep') {
        message.channel.send('Boop.');
    } else if (command === 'm') {
        const response = await WebScraper.marketCondition();
        // refactor this
        let msg = '```fix\n';
        response.forEach((ticker) => {
            msg += `${ticker.ticker} ${ticker.closing} ${ticker.change} ${ticker.changePercent}\n`
            msg += '-----------------------\n';
        });
        msg += '```';
        message.channel.send(msg);
    } else if (command === 'q') {
        const response = await StockModel.tickerSearch(args[0]);
        message.channel.send(EmbedHandler.getTickerSearchMessage(response));
    } else if (command === 'news') {
        const response = await StockModel.getNews(args[0]);
        message.channel.send(EmbedHandler.getNewsMessage(response, args[0]));
    }
}