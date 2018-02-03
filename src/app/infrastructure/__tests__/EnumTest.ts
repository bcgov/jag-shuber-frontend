import * as EnumUtils from '../EnumUtils';

enum TestDaysOfWeek {
    Mon = 1 << 0,
    Tue = 1 << 1,
    Wed = 1 << 2,
    Thu = 1 << 3,
    Fri = 1 << 4,
    Sat = 1 << 5,
    Sun = 1 << 6,
    Everyday = Mon | Tue | Wed | Thu | Fri | Sat | Sun,
    Weekdays = Mon | Tue | Wed | Thu | Fri
}

describe('displayEnum() ', () => {
    const util = EnumUtils.displayEnum;

    it('Should convert a single value to the corresponding text value from the enum', () => {
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Mon)).toEqual(["Mon"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Tue)).toEqual(["Tue"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Wed)).toEqual(["Wed"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Weekdays)).toEqual(["Weekdays"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Everyday)).toEqual(["Everyday"]);
    })

    it('Should convert a set of values to the corresponding set text values from the enum', () => {
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Mon | TestDaysOfWeek.Wed | TestDaysOfWeek.Fri)).toEqual(["Mon", "Wed", "Fri"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Tue | TestDaysOfWeek.Thu)).toEqual(["Tue", "Thu"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Sat | TestDaysOfWeek.Sun)).toEqual(["Sat", "Sun"]);
    })

    it('Should convert a set of values to the corresponding single text value, if it exists', () => {
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Mon | TestDaysOfWeek.Tue | TestDaysOfWeek.Wed |
            TestDaysOfWeek.Thu | TestDaysOfWeek.Fri | TestDaysOfWeek.Sat | TestDaysOfWeek.Sun)).toEqual(["Everyday"]);
        expect(util(TestDaysOfWeek, TestDaysOfWeek.Mon | TestDaysOfWeek.Tue | TestDaysOfWeek.Wed |
            TestDaysOfWeek.Thu | TestDaysOfWeek.Fri)).toEqual(["Weekdays"]);
    })
})