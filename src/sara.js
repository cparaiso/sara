const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('../config.json');
const CommandHandler = require('./CommandHandler/CommandHandler.js');
const TimeHandler = require('./TimeHandler/TimeHandler.js');
const EmbedHandler = require('./EmbedHandler/EmbedHandler.js');
const StockModel = require('./StockModel/StockModel.js');
const Utils = require('./Utils/Utils.js');
const NODE_ENV = process.env.NODE_ENV || "development";
const token = Utils.getDiscordTokenByEnvironment();

client.once('ready', () => {
    console.log('SARA is operational on ' + NODE_ENV + '...');
    const updateChannel = client.channels.cache.filter(x => x.type === 'text' && x.name === 'updates').first();
    const newsChannel = client.channels.cache.filter(x => x.type === 'text' && x.name === 'news').first();
    
    client.setInterval(() => {
        // 10 min alert
        if (TimeHandler.isMarketTenTillOpen()) {
            client.channels.cache.get(updateChannel.id).send(EmbedHandler.getTenToMarketOpenMessage());
            // latest news call
            StockModel.getNews().then((response) => {
                client.channels.cache.get(newsChannel.id).send(EmbedHandler.getNewsMessage(response, null));
                // aapl news call
                StockModel.getNews('aapl').then((aaplResponse) => {
                    client.channels.cache.get(newsChannel.id).send(EmbedHandler.getNewsMessage(aaplResponse, 'aapl'));
                    // tsla news call
                    StockModel.getNews('tsla').then((tslaResponse) => {
                        client.channels.cache.get(newsChannel.id).send(EmbedHandler.getNewsMessage(tslaResponse, 'tsla'));
                    });
                });
            });
        }

        // market open alert
        if (TimeHandler.isMarketOpen()) {
            client.channels.cache.get(updateChannel.id).send(EmbedHandler.getMarketOpenMessage());
        }
    }, 1000);
});

client.on('message', message => {
    // guard
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // handle commands
    CommandHandler.handleCommand(command, message, args);
});

client.login(token);