const {describe, expect, it} = require('@jest/globals');
const rewire = require('rewire');
const TimeHandler = rewire('./TimeHandler.js');

describe('TimeHandler', () => {
    it('should load TimeHandler', () => {
        expect(TimeHandler).toBeDefined();
    });

    it('should return false if not market open time', () => {
        const isOpenTime = TimeHandler.__get__('isOpenTime');
        const date = new Date("Tue May 12 2020 21:29:09 GMT-0700 (Mountain Standard Time)");
        expect(isOpenTime(date)).toBe(false);
    });

    it('should return true if market open time', () => {
        const isOpenTime = TimeHandler.__get__('isOpenTime');
        const date = new Date("Tue May 12 2020 06:30:00 GMT-0700 (Mountain Standard Time)");
        expect(isOpenTime(date)).toBe(true);
    });

    it('should return false if not ten minutes to market open', () => {
        const isTenMinutesTillOpenTime = TimeHandler.__get__('isTenMinutesTillOpenTime');
        const date = new Date("Tue May 12 2020 06:19:00 GMT-0700 (Mountain Standard Time)");
        expect(isTenMinutesTillOpenTime(date)).toBe(false);
    });

    it('should return true if ten minutes to market open', () => {
        const isTenMinutesTillOpenTime = TimeHandler.__get__('isTenMinutesTillOpenTime');
        const date = new Date("Tue May 12 2020 06:20:00 GMT-0700 (Mountain Standard Time)");
        expect(isTenMinutesTillOpenTime(date)).toBe(true);
    });
});