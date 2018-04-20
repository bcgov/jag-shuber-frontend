import { DaysOfWeek } from '../Api';

/* tslint:disable:no-bitwise */
describe('DaysOfWeek.getDisplayValues', () => {
    const util = DaysOfWeek.getDisplayValues;
    
    it('Should return each day if weekdays and Sat or Sun is selected', () => {
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sat)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sun)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']);
    }); 
       
    it('Should return each day if weekdays and Sat and Sun is selected', () => {
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sat | DaysOfWeek.Sun)).toEqual(['Everyday']);
    });

    it('Should return each day if not all weekdays or everyday are selected', () => {
        expect(util(
            DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Sat | DaysOfWeek.Sun)).
            toEqual(['Mon', 'Tue', 'Sat', 'Sun']
        );
    });

    it('Should return Weekdays, if each weekday is selected', () => {
        expect(util(
            DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Wed | DaysOfWeek.Thu | DaysOfWeek.Fri)).
            toEqual(['Weekdays'])
        ;
        expect(util(DaysOfWeek.Weekdays)).toEqual(['Weekdays']);
    }); 

    it('Should return Everyday, if each day of the week is selected', () => {
        expect(util(
            DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Wed | 
            DaysOfWeek.Thu | DaysOfWeek.Fri | DaysOfWeek.Sat | DaysOfWeek.Sun))
            .toEqual(['Everyday']
        );
        expect(util(DaysOfWeek.Everyday)).toEqual(['Everyday']);
    }); 

});

describe('DaysOfWeek.getWeekdayNumbers', () => {
    const util = DaysOfWeek.getWeekdayNumbers;

    it('Should return an array', () => {
        expect(util(DaysOfWeek.Weekdays)).toBeInstanceOf(Array);
        expect(util(DaysOfWeek.Mon)).toBeInstanceOf(Array);
    });

    it('Should return the correct number for each day of the week', () => {
        expect(util(DaysOfWeek.Sun)).toEqual(expect.arrayContaining([0]));
        expect(util(DaysOfWeek.Mon)).toEqual(expect.arrayContaining([1]));
        expect(util(DaysOfWeek.Tue)).toEqual(expect.arrayContaining([2]));
        expect(util(DaysOfWeek.Wed)).toEqual(expect.arrayContaining([3]));
        expect(util(DaysOfWeek.Thu)).toEqual(expect.arrayContaining([4]));
        expect(util(DaysOfWeek.Fri)).toEqual(expect.arrayContaining([5]));
        expect(util(DaysOfWeek.Sat)).toEqual(expect.arrayContaining([6]));
    });

    it('Should return the correct number for each day, when mulitple days are selected', () => {
        expect(util(DaysOfWeek.Weekdays)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
        expect(util(DaysOfWeek.Everyday)).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5, 6]));
        expect(util(DaysOfWeek.Mon | DaysOfWeek.Wed | DaysOfWeek.Fri)).toEqual(expect.arrayContaining([1, 3, 5]));
        expect(
            util(DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Wed | DaysOfWeek.Thu | DaysOfWeek.Fri | DaysOfWeek.Sat)).
            toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6])
        );
        expect(
            util(DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Wed | DaysOfWeek.Thu | DaysOfWeek.Fri | DaysOfWeek.Sun)).
            toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5])
        );
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sat)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sun)).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
    });

});
 /* tslint:enable:no-bitwise */ 