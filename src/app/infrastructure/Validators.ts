export const VALIDATOR_MESSAGES = {
    INVALID_INTEGER: 'Must be an integer.',
    INVALID_NUMBER: 'Must be a number.',
    REQUIRED_VALUE: 'This is a required field.',
    INVALID_INTEGER_RANGE: 'Must be an integer between 1 and 50'   
};

export const required = (value?: any) => value || value === false ? undefined :  VALIDATOR_MESSAGES.REQUIRED_VALUE;

export const integer = (value: any) => {  
    let invalidMessage = number(value);
    if (!invalidMessage) {
        const numericValue = Number(value);
        if (Math.floor(numericValue) === numericValue) {
            invalidMessage = undefined;
        } else {
             invalidMessage = VALIDATOR_MESSAGES.INVALID_INTEGER;
        }
    }
    return invalidMessage;
};

export const integerBetween1and50 = (value: any) => {
    let invalidMessage = integer(value);
    if (!invalidMessage) {
        const numericValue = Number(value);
        if (numericValue <= 50 && numericValue >= 1) {
            invalidMessage = undefined;
        } else {
            invalidMessage = VALIDATOR_MESSAGES.INVALID_INTEGER_RANGE;
        }
    }
    return invalidMessage;
};

export const number = (value: any) => { 
    return value && isNaN(value) ? VALIDATOR_MESSAGES.INVALID_NUMBER : undefined;
};