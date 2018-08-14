import moment from 'moment';
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
        (startTimeTwoMoment.isBetween(startTimeOneMoment, endTimeOneMoment) 
            || endTimeTwoMoment.isBetween(startTimeOneMoment, endTimeOneMoment))
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
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(6, 'hour');
    } else {
        return moment().startOf('day').add(6, 'hour');
    }
}

export function getDefaultEndTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(18, 'hour');
    } else {
        return moment().startOf('day').add(18, 'hour');
    }
}

export function getDefaultTimeRange (dayForTime?: moment.Moment): {startTime: moment.Moment, endTime: moment.Moment} {
   if (dayForTime && dayForTime.isValid()) {
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
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(6, 'hour');
    } else {
        return moment().startOf('day').add(6, 'hour');
    }
}

export function getDefaultTimePickerMaxTime (dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(22, 'hour');
    } else {
        return moment().startOf('day').add(22, 'hour');
    }
}

export function getDefaultTimePickerRange (dayForTime?: moment.Moment): {startTime: moment.Moment, endTime: moment.Moment} {
    if (dayForTime && dayForTime.isValid()) /* istanbul ignore if */{
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

export function roundTimeToNearestQuaterHour (timeToRound: moment.Moment): moment.Moment {
    const minutes = moment(timeToRound).minutes();
    const hour = moment(timeToRound).hours();

    if (minutes <= 7) {
        return moment(timeToRound).minute(0);
    } else if (minutes >= 8 && minutes <= 22) {
        return moment(timeToRound).minute(15);
    } else if (minutes >= 23 && minutes <= 37) {
        return moment(timeToRound).minute(30);
    } else if (minutes >= 38 && minutes <= 52) {
        return moment(timeToRound).minute(45);
    } else if (minutes >= 53) {
        return moment(timeToRound).hour(hour + 1).minute(0);
    } else {
        return moment(timeToRound).minute(0);
    }
}