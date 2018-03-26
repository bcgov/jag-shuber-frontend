import * as moment from 'moment';
import { 
    DaysOfWeek
} from '../../api/Api';
import { 
    ShiftFactory, 
    ShiftCreationPayload
} from '../utils';

const testPayload: ShiftCreationPayload = {
    weekStart: moment().startOf('isoWeek').subtract(1, 'day'),
    startTime: moment().hours(9).minutes(15),
    endTime: moment().hours(17).minutes(30),
    repeatNumber: 2, 
    workSectionId: 'COURTS',
    days: DaysOfWeek.Weekdays
};

describe('ShiftFactory.createShifts()', () => {
    const util = ShiftFactory.createShifts;

    it('Should return an array', () => {
        expect(util(testPayload)).toBeInstanceOf(Array);
    });

    it('Should create 10 shifts when repeating 2 shifts over the weekdays', () => {
        expect(util(testPayload)).toHaveLength(10);
    });

    it('Should create 3 shifts when repeating 1 shift over Mon, Wed, Fri', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 1,
            // tslint:disable-next-line:no-bitwise
            days: DaysOfWeek.Mon | DaysOfWeek.Wed | DaysOfWeek.Fri
        };
        expect(util(payload)).toHaveLength(3);
    });

    it('Should create 7 shifts when repeating 1 shift over everyday of week', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 1,
            days: DaysOfWeek.Everyday
        };
        expect(util(payload)).toHaveLength(7);
    });

    it('Should create a shift at the appropriate time on the appropriate day', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 1,
            days: DaysOfWeek.Mon
        };
        
        const expectedResult = [
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }
        ];

        expect(util(payload)).toEqual(expect.arrayContaining(expectedResult));
    });

    it('Should create correct number of repeats of shifts on the appropriate day and time', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 3,
            days: DaysOfWeek.Mon
        };
        
        const expectedResult = [
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }
        ];

        expect(util(payload)).toEqual(expect.arrayContaining(expectedResult));
    });

    it('Should create the correct shifts when multiple repeats and weekdays are selected', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 3,
            days: DaysOfWeek.Weekdays
        };

        const expectedResult = [
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 2, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 2, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 2, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 2, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 2, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 2, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 4, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 4, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 4, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 4, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 4, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 4, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            }

        ];

        expect(util(payload)).toEqual(expect.arrayContaining(expectedResult));
    });

    it('Should create the correct shifts when multiple repeats and more than one day is selected', () => {
        const payload = {
            ...testPayload,
            repeatNumber: 3,
            // tslint:disable-next-line:no-bitwise
            days: DaysOfWeek.Mon | DaysOfWeek.Wed | DaysOfWeek.Fri | DaysOfWeek.Sat
        };

        const expectedResult = [
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 1, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 1, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 3, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 3, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 5, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 5, hours: 17, minutes: 30})
            },
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 6, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 6, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 6, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 6, hours: 17, minutes: 30})
            }, 
            {
                workSectionId: 'COURTS',
                startDateTime: moment(testPayload.weekStart).add({days: 6, hours: 9, minutes: 15}),
                endDateTime: moment(testPayload.weekStart).add({days: 6, hours: 17, minutes: 30})
            }

        ];

        expect(util(payload)).toEqual(expect.arrayContaining(expectedResult));
    });
});