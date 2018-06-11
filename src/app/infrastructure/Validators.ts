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

export const minValidator = (minValue: number) => (
    (value?: any) => (
        value && value < minValue ? `Must be at least ${minValue}` : undefined
    )
);

export const maxValidator = (maxValue: number) => (
    (value?: any) => (
        value && value > maxValue ? `Must be at less than ${maxValue}` : undefined
    )
);

export const max50 = maxValidator(50);

export const min1 = minValidator(1);

export const max10 = maxValidator(10);

export const number = (value: any) => { 
    return value && isNaN(value) ? VALIDATOR_MESSAGES.INVALID_NUMBER : undefined;
};

export const maxLengthValidator = (maxLengthValue: number) => (
    (value?: string) => (
        value && value.length > maxLengthValue ? `Must be fewer than ${maxLengthValue} characters` : undefined
    )
);
export const maxLength200 = maxLengthValidator(200);