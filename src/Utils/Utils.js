const NODE_ENV = process.env.NODE_ENV || "development";
const DISCORD_DEV_TOKEN = process.env.DISCORD_DEV_TOKEN;
const DISCORD_PROD_TOKEN = process.env.DISCORD_PROD_TOKEN;
const IEX_CLOUD_PROD_TOKEN = process.env.IEX_CLOUD_PROD_TOKEN;
const IEX_CLOUD_SANDBOX_TOKEN = process.env.IEX_CLOUD_SANDBOX_TOKEN;
const {IEX_CLOUD_SANDBOX_URL, IEX_CLOUD_PROD_URL} = require('../../config.json');

exports.getDiscordTokenByEnvironment = () => {
    return (NODE_ENV === 'production') ? DISCORD_PROD_TOKEN : DISCORD_DEV_TOKEN;
};

exports.getIEXTokenUrlByEnvironment = () => {
    const iex = {};
    if (NODE_ENV === 'production') {
        iex.url = IEX_CLOUD_PROD_URL;
        iex.token = IEX_CLOUD_PROD_TOKEN;
    } else {
        iex.url = IEX_CLOUD_SANDBOX_URL;
        iex.token = IEX_CLOUD_SANDBOX_TOKEN;
    }

    return iex;
};