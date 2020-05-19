const {timezone, weekdays, times} = require('../../config.json');

const isOpenTime = (date) => {
    const time = date.toLocaleTimeString('en-US', { hour12: false, timeZone: timezone });
    return time === times.marketOpen;
};

const isTenMinutesTillOpenTime = (date) => {
    const time = date.toLocaleTimeString('en-US', { hour12: false, timeZone: timezone });
    return time === times.tenToMarketOpen;
};

const isOpenDay = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: timezone }).split(' ')[0];
    // is week day?
    return weekdays.includes(day);
};

exports.isMarketOpen = () => {
    const date = new Date();
    return isOpenTime(date) && isOpenDay(date);
};

exports.isMarketTenTillOpen = () => {
    const date = new Date();
    return isTenMinutesTillOpenTime(date) && isOpenDay(date);
};

