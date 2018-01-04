import { Validators } from "../index";


describe('Integer Validator', () => {
    const validator = Validators.integer;
    it('Should return undefined given an integer', () => {
        expect(validator(10)).toBeUndefined();
    })

    it('Should return an error message given a decimal value', () => {
        expect(validator(10.987)).toBe(Validators.VALIDATOR_MESSAGES.INVALID_INTEGER);
    })

    it('Should return an error message given anything but an integer', () => {
        // expect(validator('10')).toBeDefined(); this is "a number" need to fix this
        expect(validator('random text')).toBeDefined();
        expect(validator(['array', 'of', 'strings'])).toBeDefined();
        expect(validator({ key: 'value' })).toBeDefined();
    })

})

