export const VALIDATOR_MESSAGES = {
    INVALID_INTEGER: "Must be an integer.",
    INVALID_NUMBER: "Must be a number.",
    REQUIRED_VALUE: "This is a required field."
    
}

export const required = (value?:any) => value || value===false ? undefined :  VALIDATOR_MESSAGES.REQUIRED_VALUE;


export const integer = (value:any) =>{ 
    let invalidMessage = number(value);
    if(!invalidMessage){
        const numericValue = Number(value);
        if(Math.floor(numericValue)===numericValue){
            invalidMessage = undefined;
        }else{
             invalidMessage = VALIDATOR_MESSAGES.INVALID_INTEGER;
        }
    }
    return invalidMessage;
}

export const number = (value:any) =>{ 
    return value && isNaN(value) ? VALIDATOR_MESSAGES.INVALID_NUMBER : undefined;
}

/* examples of other validators that can be used as needed

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined */