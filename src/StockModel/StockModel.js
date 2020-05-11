const axios = require('axios');
const {iexTestToken, iexSandBoxUrl} = require('../../config.json');

exports.tickerSearch = async (ticker) => {
    const response = await axios.get(`${iexSandBoxUrl}/stock/${ticker}/quote?token=${iexTestToken}`);
    const data = response.data;
    console.log(data);
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
    const response = await axios.get(`${iexSandBoxUrl}/stock/${ticker}/news?token=${iexTestToken}`);
    const data = response.data;
    console.log(data);
};