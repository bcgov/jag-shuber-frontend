import * as moment from 'moment';
import * as ShiftCreator from '../ShiftCreator';
import { 
    DaysOfWeek,
    Shift 
} from '../../api/Api';
import { ShiftCreationPayload } from '../../modules/shifts/actions';

const testPayload: ShiftCreationPayload = {
    weekStart: moment().startOf('week'),
    weekEnd: moment().endOf('week'),
    startTime: moment().hour(9).minutes(0),
    endTime: moment().hour(17).minutes(0),
    repeatNumber: 2, 
    workSectionId: 'COURTS',
    days: DaysOfWeek.Weekdays
};


const shiftResult: Partial<Shift>[] = [
    {
        workSectionId: 'COURTS',
        // startDateTime: moment(testPayload.weekStart).set({day: 1, hours: 9, minute: 0}),
        // endDateTime: weekStartMoment.day(1).hours(endHour).minute(0),
        // startDateTime: weekStartMoment.set({'day': 1, 'hour': startHour, 'minute': startMinute}),
        endDateTime:  moment(testPayload.weekStart).set({day: 1, hours: 17, minute: 0})
    }
];

describe('createShiftsFromShiftCreatorPayload()', () => {
    const util = ShiftCreator.createShiftsFromShiftCreatorPayload;

    it('Should create a list of partial shifts from a shift creator payload', () => {
        expect(util(testPayload)).toEqual(shiftResult);
    });
});