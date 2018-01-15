import * as validators from './Validators';
export const Validators = validators;


export function toTitleCase(str:string=''):string{
    return str.toLowerCase()
        .split(' ')
        .map(s=>s.charAt(0).toUpperCase()+s.slice(1))
        .join(' ');
}