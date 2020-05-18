import moment from 'moment';
import { fromTimeString } from 'jag-shuber-api';

export const VALIDATOR_MESSAGES = {
    INVALID_INTEGER: 'Must be an integer',
    INVALID_NUMBER: 'Must be a number',
    REQUIRED_VALUE: 'This is a required field',
    INVALID_INTEGER_RANGE: 'Must be an integer between 1 and 50',
    DATE_MUST_BE_BEFORE: 'Must be before',
    DATE_MUST_BE_AFTER: 'Must be after',
    DATE_MUST_BE_ON_OR_BEFORE: 'Must be on or before',
    DATE_MUST_BE_ON_OR_AFTER: 'Must be on or after'
};

type Validator = (value: any) => string | undefined;

export const required = (value?: any) => value || value === false ? undefined : VALIDATOR_MESSAGES.REQUIRED_VALUE;

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
        value && value > maxValue ? `Must be ${maxValue} or less` : undefined
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

export const isTimeBefore = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!fromTimeString(dateValue).isBefore(fromTimeString(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_BEFORE} ${otherDateName}`;
        }

        return;
    };
};

export const isTimeAfter = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!fromTimeString(dateValue).isAfter(fromTimeString(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_AFTER} ${otherDateName}`;
        }
        return;
    };
};

export const isBefore = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!moment(dateValue).isBefore(moment(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_BEFORE} ${otherDateName}`;
        }
        return;
    };
};

export const isSameOrBefore = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!moment(dateValue).isSameOrBefore(moment(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_ON_OR_BEFORE} ${otherDateName}`;
        }
        return;
    };
};

export const isAfter = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!moment(dateValue).isAfter(moment(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_BEFORE} ${otherDateName}`;
        }
        return;
    };
};

export const isSameOrAfter = (otherDateValue: any, otherDateName: string) => {
    return (dateValue: any) => {
        if (!moment(dateValue).isSameOrAfter(moment(otherDateValue))) {
            return `${VALIDATOR_MESSAGES.DATE_MUST_BE_ON_OR_AFTER} ${otherDateName}`;
        }
        return;
    };
};

export function validateWith(...validators: Validator[]): Validator {
    const validateWithResult = (value: any) => {
        // console.log('******************************');
        const mappedValidations = validators.map(v => {
            const validationResult = v(value);
            // console.log('processing: ' + JSON.stringify(value));
            // console.log('result: ' + JSON.stringify(validationResult));
            return validationResult;
        }).filter(m => m !== undefined);

        let validationMessage = (mappedValidations.length > 0) ? mappedValidations.join('. ') : undefined;

        // console.log('---- generated output ----');
        // console.log('type: ' + typeof validationMessage);
        // console.log('value: ' + JSON.stringify(validationMessage));

        return validationMessage;
    };

    return validateWithResult;
}
