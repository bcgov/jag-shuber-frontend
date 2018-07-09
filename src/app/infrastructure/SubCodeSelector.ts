import { EffectiveSelector } from './EffectiveSelector';
import { DateType, IdType } from '../api/Api';

export interface Code {
    code: IdType;
    description: string;
    expiryDate?: DateType;
}

export class CodeSelector extends EffectiveSelector<Code> {
    constructor(
        mapSelector: ((state: any) => {[key: string]: Code})){
            super(mapSelector, (c) => c.expiryDate, (a, b) => a.description.localeCompare(b.description));
    }
}