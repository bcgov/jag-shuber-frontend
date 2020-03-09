import { DateType } from '../api/Api';
import { createSelector } from 'reselect';
import mapToArray from './mapToArray';
import moment from 'moment';

export class EffectiveSelector<T> {
    private _getAll: (state: any) => T[];
    private _getEffective: (date?: DateType) => (state: any) => T[];

    constructor(
        private mapSelector: ((state: any) => {[key: string]: T}),
        private getExpiryDate: ((item: T) => DateType | undefined),
        private sort?: ((a: T, b: T) => number)) {
            this._getAll =
                createSelector(
                    this.mapSelector,
                    (items) => {
                        const array = mapToArray(items);
                        if (this.sort) {
                            return array.sort(this.sort);
                        }
                        return array;
                    }
                );

            this._getEffective = (date: DateType = moment()) => (state: any) => {
                const effectiveItems = this.all(state)
                    .filter(c => {
                        const expiryDate = this.getExpiryDate(c);
                        return !expiryDate || moment(expiryDate).isAfter(moment(date));
                    });
                return effectiveItems;
            };

    }

    public get all() {
        return this._getAll;
    }

    public get effective() {
        return this._getEffective;
    }

}
