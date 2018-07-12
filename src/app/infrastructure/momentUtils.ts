import * as moment from 'moment'

export function ensureMoment(dateTime: any): moment.Moment {
    if (!moment.isMoment(dateTime)) {
        return moment(dateTime);
    }
    return dateTime;
}