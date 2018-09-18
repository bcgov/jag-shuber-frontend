import * as TimeRangeUtils from '../TimeRangeUtils';
import moment from 'moment';

describe('roundTimeToNearestQuarterHour() ', () => {
    const util = TimeRangeUtils.roundTimeToNearestQuarterHour;

    /* tslint:disable:max-line-length */
    const onePM = moment().hour(13).minute(0).second(0).millisecond(0);
    const onePM3Min = moment().hour(13).minute(3).second(0).millisecond(0);
    const onePM7Min = moment().hour(13).minute(7).second(0).millisecond(0);
    it(
        'Should return 00 minutes if timeToRound has minutes less than or equal to 07', 
        () => {
            expect(util(onePM)).toEqual(onePM);
            expect(util(onePM3Min)).toEqual(onePM);
            expect(util(onePM7Min)).toEqual(onePM); 
        }
    );

    const onePM8Min = moment().hour(13).minute(8).second(0).millisecond(0);
    const onePM10Min = moment().hour(13).minute(10).second(0).millisecond(0);
    const onePM15Min = moment().hour(13).minute(15).second(0).millisecond(0);
    const onePM18Min = moment().hour(13).minute(18).second(0).millisecond(0);
    const onePM22Min = moment().hour(13).minute(22).second(0).millisecond(0);
    it(
        'Should return 15 minutes if timeToRound has minutes between 8 and 22 (inclusive)', 
        () => {
            expect(util(onePM8Min)).toEqual(onePM15Min);
            expect(util(onePM10Min)).toEqual(onePM15Min);
            expect(util(onePM15Min)).toEqual(onePM15Min);
            expect(util(onePM18Min)).toEqual(onePM15Min);
            expect(util(onePM22Min)).toEqual(onePM15Min);
        }
    );

    const onePM23Min = moment().hour(13).minute(23).second(0).millisecond(0);
    const onePM28Min = moment().hour(13).minute(28).second(0).millisecond(0);
    const onePM30Min = moment().hour(13).minute(30).second(0).millisecond(0);
    const onePM35Min = moment().hour(13).minute(35).second(0).millisecond(0);
    const onePM37Min = moment().hour(13).minute(37).second(0).millisecond(0);
    it(
        'Should return 30 minutes if timeToRound has minutes between 23 and 37 (inclusive)', 
        () => {
            expect(util(onePM23Min)).toEqual(onePM30Min);
            expect(util(onePM28Min)).toEqual(onePM30Min);
            expect(util(onePM30Min)).toEqual(onePM30Min);
            expect(util(onePM35Min)).toEqual(onePM30Min);
            expect(util(onePM37Min)).toMatchObject(onePM30Min);
        }
    );

    const onePM38Min = moment().hour(13).minute(38).second(0).millisecond(0);
    const onePM40Min = moment().hour(13).minute(40).second(0).millisecond(0);
    const onePM45Min = moment().hour(13).minute(45).second(0).millisecond(0);
    const onePM48Min = moment().hour(13).minute(48).second(0).millisecond(0);
    const onePM52Min = moment().hour(13).minute(52).second(0).millisecond(0);
    it(
        'Should return 45 minutes if timeToRound has minutes between 38 and 52 (inclusive)', 
        () => {
            expect(util(onePM38Min)).toEqual(onePM45Min);
            expect(util(onePM40Min)).toEqual(onePM45Min);
            expect(util(onePM45Min)).toEqual(onePM45Min);
            expect(util(onePM48Min)).toEqual(onePM45Min);
            expect(util(onePM52Min)).toEqual(onePM45Min);
        }
    );

    const onePM53Min = moment().hour(13).minute(53).second(0).millisecond(0);
    const onePM59Min = moment().hour(13).minute(59).second(0).millisecond(0);
    const twoPM = moment().hour(14).minute(0).second(0).millisecond(0);
    it(
        'Should return the next hour if timeToRound has minutes greater than or equal to 53', 
        () => {
            expect(util(onePM53Min)).toEqual(twoPM);
            expect(util(onePM59Min)).toEqual(twoPM);
        }
    );

});