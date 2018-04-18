import * as moment from 'moment';
import { TimeType } from '../api/Api';

export function doTimeRangesOverlap (
    timeRangeOne: {startTime: TimeType, endTime: TimeType}, 
    timeRangeTwo: {startTime: TimeType, endTime: TimeType}): boolean {
    
    const startTimeOneMoment = moment(timeRangeOne.startTime);
    const endTimeOneMoment = moment(timeRangeOne.endTime);
    
    const startTimeTwoMoment = moment(timeRangeTwo.startTime);
    const endTimeTwoMoment = moment(timeRangeTwo.endTime);
    
    return (
        (startTimeOneMoment.isBetween(startTimeTwoMoment, endTimeTwoMoment) 
            || endTimeOneMoment.isBetween(startTimeTwoMoment, endTimeTwoMoment))
        ||
        (startTimeOneMoment.isSame(startTimeTwoMoment) 
            && endTimeOneMoment.isSame(endTimeTwoMoment))
        ||
        (startTimeOneMoment.isSame(startTimeTwoMoment) 
            && endTimeOneMoment.isBetween(startTimeTwoMoment, endTimeTwoMoment))
        ||
        (endTimeOneMoment.isSame(endTimeTwoMoment) 
        && startTimeOneMoment.isBetween(startTimeTwoMoment, endTimeTwoMoment))
        ||
        (startTimeTwoMoment.isSame(startTimeOneMoment) 
            && endTimeTwoMoment.isBetween(startTimeOneMoment, endTimeOneMoment))
        ||
        (endTimeTwoMoment.isSame(endTimeOneMoment) 
        && startTimeTwoMoment.isBetween(startTimeOneMoment, endTimeOneMoment))
    );
}