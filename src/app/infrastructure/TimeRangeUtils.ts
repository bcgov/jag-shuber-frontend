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

export function getDefaultStartTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime) {
        return dayForTime.startOf('day').add(7, 'hour');
    } else {
        return moment().startOf('day').add(7, 'hour');
    }
}

export function getDefaultEndTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime) {
        return dayForTime.startOf('day').add(18, 'hour');
    } else {
        return moment().startOf('day').add(18, 'hour');
    }
}

export function getDefaultTimeRange (dayForTime?: moment.Moment): {startTime: moment.Moment, endTime: moment.Moment} {
   if (dayForTime) {
       return {
            startTime: getDefaultStartTime(dayForTime),
            endTime: getDefaultEndTime(dayForTime)
       };
    } else {
       return {
        startTime: getDefaultStartTime(moment()),
        endTime: getDefaultEndTime(moment())
       };
   }
}

export function getDefaultTimePickerMinTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime) {
        return dayForTime.startOf('day').add(6, 'hour');
    } else {
        return moment().startOf('day').add(6, 'hour');
    }
}

export function getDefaultTimePickerMaxTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime) {
        return dayForTime.startOf('day').add(22, 'hour');
    } else {
        return moment().startOf('day').add(22, 'hour');
    }
}

export function getDefaultTimePickerRange (dayForTime?: moment.Moment): {startTime: moment.Moment, endTime: moment.Moment} {
    if (dayForTime) {
        return {
             startTime: getDefaultTimePickerMinTime(dayForTime),
             endTime: getDefaultTimePickerMaxTime(dayForTime)
        };
     } else {
        return {
         startTime: getDefaultTimePickerMinTime(moment()),
         endTime: getDefaultTimePickerMaxTime(moment())
        };
    }
}