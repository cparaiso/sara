const axios = require('axios');
const Utils = require('../Utils/Utils.js');
const IEX = Utils.getIEXTokenUrlByEnvironment();

exports.tickerSearch = async (ticker) => {
    const response = await axios.get(`${IEX.url}/stock/${ticker}/quote?token=${IEX.token}`);
    const data = response.data;

    return {
        companyName: data.companyName,
        symbol: data.symbol,
        latestPrice: data.latestPrice,
        change: data.change.toFixed(2),
        changePercent: (data.changePercent * 100).toFixed(2),
        week52High: data.week52High,
        week52Low: data.week52Low
    };
};

exports.getNews = async (ticker) => {
    let response = {};

    if (!ticker) {
        ticker = 'market';
        response = await axios.get(`${IEX.url}/stock/${ticker}/news?token=${IEX.token}`);
    } else {
        response = await axios.get(`${IEX.url}/stock/${ticker}/news/last/5?token=${IEX.token}`);
    }

    return response.data;
};