import * as arrayUtils from '../arrayUtils';

describe('allSame() ', () => {
    const util = arrayUtils.allSame;
    it('Should return true if elements are all the same', () => {
        expect(util(['a', 'a', 'a'], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return true if the array has only one element', () => {
        expect(util(['a'], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return true if the array is empty', () => {
        expect(util([], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return false if elements are not all the same', () => {
        expect(util(['a', 'b'], (value1, value2) => (value1 === value2))).toBeFalsy();
        expect(util(['a', 'a', 'b'], (value1, value2) => (value1 === value2))).toBeFalsy();
        expect(util(['a', 'b', 'b'], (value1, value2) => (value1 === value2))).toBeFalsy();
    });

});

describe('anySame() ', () => {
    const util = arrayUtils.anySame;
    it('Should return true if elements are all the same', () => {
        expect(util(['a', 'a', 'a'], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return true if the array has only one element', () => {
        expect(util(['a'], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return true if the array is empty', () => {
        expect(util([], (value1, value2) => (value1 === value2))).toBeTruthy();
    });
    it('Should return false if all elements are different', () => {
        expect(util(['a', 'b', 'c'], (value1, value2) => (value1 === value2))).toBeFalsy();
    });
    it('Should return true if any two elements are the same', () => {
        expect(util(['a', 'b', 'a'], (value1, value2) => (value1 === value2))).toBeTruthy();
    });

});
