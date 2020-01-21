import { EffectiveSelector } from './EffectiveSelector';
import { DateType, IdType } from '../api/Api';

export interface Code {
    code: IdType;
    description: string;
    expiryDate?: DateType;
}

export class CodeSelector<P extends Code> extends EffectiveSelector<P> {
    constructor(
        mapSelector: ((state: any) => { [key: string]: P }),
        sort: ((a: P, b: P) => number) = (a, b) => (a.description)
            ? a.description.localeCompare(b.description) : -1
    ) {
        super(mapSelector, (c) => c.expiryDate, sort);
    }
}
