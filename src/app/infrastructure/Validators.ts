//const required = (value:any) => value ? undefined : 'Required'
//const required = (value:any) => {}
export function required(value:any){
    if(value){
        return undefined;
    }
    return 'Required';

    //return value ? undefined : 'Required';
}

function maxLength (max:number){
    const validator = function (value:any){
        value && value.length > max ? `Must be ${max} characters or less` : undefined
    }
    return validator;
} 


 const maxNameLength = 15;
 export const maxLength15 = maxLength(maxNameLength);
 export const maxLength10 = maxLength(10);

export const number = (value:any) =>{ 
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
}
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//   'Invalid email address' : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value) ?
//   'Really? You still use AOL for your email?' : undefined