import * as TimeRangeUtils from '../TimeRangeUtils';
import * as moment from 'moment';

describe('doTimeRangesOverlap() ', () => {
    const util = TimeRangeUtils.doTimeRangesOverlap;

    const onePM = moment().hour(13).minute(0).second(0).millisecond(0).toISOString();
    const twoPM = moment().hour(14).minute(0).second(0).millisecond(0).toISOString();
    const threePM = moment().hour(15).minute(0).second(0).millisecond(0).toISOString();
    const fourPM = moment().hour(16).minute(0).second(0).millisecond(0).toISOString();

    it(
        // tslint:disable-next-line:max-line-length
        'Should return true if the start time or end time of time range one is between the start and end time of time range two', 
        () => {
            expect(util({startTime: onePM, endTime: threePM}, {startTime: twoPM, endTime: fourPM})).toBeTruthy();
        }
    );
    
    it(
        'Should return true if start times of each time range are equal and the end time of time range two is between the start and end of time range one', 
        () => {
            expect(util({startTime: onePM, endTime: threePM}, {startTime: onePM, endTime: twoPM})).toBeTruthy();
        }
    );

    it(
        'Should return true if start times of each time range are equal and the end time of time range one is between the start and end of time range two', 
        () => {
            expect(util({startTime: onePM, endTime: twoPM}, {startTime: onePM, endTime: threePM})).toBeTruthy();
        }
    );

    it(
        'Should return true if end times of each time range are equal and the start time of time range one is between the start and end of time range two', 
        () => {
            expect(util({startTime: twoPM, endTime: threePM}, {startTime: onePM, endTime: threePM})).toBeTruthy();
        }
    );

    it(
        'Should return true if end times of each time range are equal and the start time of time range two is between the start and end of time range one', 
        () => {
            expect(util({startTime: onePM, endTime: threePM}, {startTime: twoPM, endTime: threePM})).toBeTruthy();
        }
    );

    it(
        'Should return true if time ranges are the same', 
        () => {
            expect(util({startTime: onePM, endTime: threePM}, {startTime: onePM, endTime: threePM})).toBeTruthy();
        }
    );

    it(
        'Should return false if the end time of time range one is the same as the start time of time range two', 
        () => {
            expect(util({startTime: onePM, endTime: threePM}, {startTime: threePM, endTime: fourPM})).toBeFalsy();
        }
    );

    it(
        'Should return false if the time range one is before time range two', 
        () => {
            expect(util({startTime: onePM, endTime: twoPM}, {startTime: threePM, endTime: fourPM})).toBeFalsy();
        }
    );

    it(
        'Should return false if the time range one after is after time range two', 
        () => {
            expect(util({startTime: threePM, endTime: fourPM}, {startTime: onePM, endTime: twoPM})).toBeFalsy();
        }
    );

});