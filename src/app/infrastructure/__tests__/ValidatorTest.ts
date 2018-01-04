import { Validators } from "../index";


describe('Integer Validator', () => {
    const validator = Validators.integer;
    it('Should return undefined given an integer', () => {
        expect(validator(10)).toBeUndefined();
        expect(validator('14')).toBeUndefined();
    })

    it('Should return an error message given a decimal value', () => {
        expect(validator(10.987)).toBe(Validators.VALIDATOR_MESSAGES.INVALID_INTEGER);
        expect(validator('10.987')).toBe(Validators.VALIDATOR_MESSAGES.INVALID_INTEGER);
    })

    it('Should return an error message given a string', () => {
        expect(validator('random text')).toBeDefined();
    })

    it('Should return an error message given an array', () => {
        expect(validator(['array', 'of', 'strings'])).toBeDefined();
    })

    it('Should return an error message given an object', () => {
        expect(validator({ key: 'value' })).toBeDefined();
    })

})

describe('Number Validator', () => {
    const validator = Validators.number;
    it('Should return undefined given an integer', () => {
        expect(validator(10)).toBeUndefined();
        expect(validator(-874)).toBeUndefined();
    })

    it('Should return undefined given a decimal value', () => {
        expect(validator(10.5)).toBeUndefined();
        expect(validator(-10.5)).toBeUndefined();
    })

    it('Should return undefined given a string that contains only an integer', () => {
        expect(validator('14')).toBeUndefined();
        expect(validator('14.5')).toBeUndefined();       
    })

    it('Should return undefined given a string that contains only a decimal value', () => {
        expect(validator('14.45')).toBeUndefined();
        expect(validator('-14.45')).toBeUndefined();       
    })

    it('Should return an error message given a string', () => {
        expect(validator('random text')).toBeDefined();
    })

    it('Should return an error message given an array', () => {
        expect(validator(['array', 'of', 'strings'])).toBeDefined();
    })

    it('Should return an error message given an object', () => {
        expect(validator({ key: 'value' })).toBeDefined();
    })

})

describe('Required Validator', () => {
    const validator = Validators.required;
    it('Should return undefined given a number', () => {
        expect(validator(10)).toBeUndefined();
    })

    it('Should return undefined given a string', () => {
        expect(validator('random text')).toBeUndefined();
    })

    it('Should return undefined given an array', () => {
        expect(validator(['array', 'of', 'strings'])).toBeUndefined();
    })

    it('Should return undefined given an object', () => {
        expect(validator({ key: 'value' })).toBeUndefined();
    })

    it('Should return undefined given true', () => {
       expect(validator(true)).toBeUndefined();        
    })

    it('Should return undefined given false', () => {
        expect(validator(false)).toBeUndefined();        
    })

    it('Should return an error message given a null value', () => {
        expect(validator(null)).toBeDefined();
    })

    it('Should return an error message given an empty string', () => {
        expect(validator('')).toBeDefined();
    })

    it('Should return an error message given nothing', () => {
        expect(validator()).toBeDefined();
    })

    it('Should return an error message given undefined', () => {
        expect(validator(undefined)).toBeDefined();
    })

})
