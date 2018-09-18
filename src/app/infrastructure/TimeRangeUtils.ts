import moment from 'moment';

export function getDefaultStartTime(dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(6, 'hour');
    } else {
        return moment().startOf('day').add(6, 'hour');
    }
}

export function getDefaultEndTime(dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(18, 'hour');
    } else {
        return moment().startOf('day').add(18, 'hour');
    }
}

export function getDefaultTimeRange(dayForTime?: moment.Moment): { startTime: moment.Moment, endTime: moment.Moment } {
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

export function getDefaultTimePickerMinTime(dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(6, 'hour');
    } else {
        return moment().startOf('day').add(6, 'hour');
    }
}

export function getDefaultTimePickerMaxTime(dayForTime?: moment.Moment): moment.Moment {
    if (dayForTime && dayForTime.isValid()) {
        return dayForTime.startOf('day').add(22, 'hour');
    } else {
        return moment().startOf('day').add(22, 'hour');
    }
}

export function getDefaultTimePickerRange(dayForTime?: moment.Moment): { startTime: moment.Moment, endTime: moment.Moment } {
    if (dayForTime && dayForTime.isValid()) /* istanbul ignore if */ {
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

export function roundTimeToNearestQuarterHour(timeToRound: moment.Moment): moment.Moment {
    const minutes = moment(timeToRound).minutes();
    const roundedMinutes = Math.round(minutes / 15.0) * 15;
    return moment(timeToRound).minute(roundedMinutes).second(0).millisecond(0);
}