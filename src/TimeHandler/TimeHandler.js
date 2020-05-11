const {timezone, weekdays, times} = require('../../config.json');

exports.isMarketOpen = () => {
    let date = new Date();
    // console.log(date.toLocaleTimeString('en-US', { hour12: false, timeZone: timezone }));
    return isOpenTime(date) && isOpenDay(date);
};

exports.isMarketTenTillOpen = () => {
    let date = new Date();
    return isTenMinutesTillOpenTime(date) && isOpenDay(date);
};

let isOpenTime = (date) => {
    const time = date.toLocaleTimeString('en-US', { hour12: false, timeZone: timezone });
    return time === times.marketOpen;
};

let isTenMinutesTillOpenTime = (date) => {
    const time = date.toLocaleTimeString('en-US', { hour12: false, timeZone: timezone });
    return time === times.tenToMarketOpen;
};

let isOpenDay = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: timezone }).split(' ')[0];
    // is week day?
    return weekdays.includes(day);
};