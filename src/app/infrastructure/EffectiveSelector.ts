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
                        const array = mapToArray(items)
                            .map((item) => {
                                // @ts-ignore
                                if (item.hasOwnProperty('expiryDate') && item.expiryDate !== null) {
                                    const date: DateType = moment();
                                    const expiryDate = this.getExpiryDate(item);
                                    // @ts-ignore
                                    item.isExpired = !!expiryDate || moment(expiryDate).isSameOrBefore(moment(date));
                                    // @ts-ignore
                                } else if (item.hasOwnProperty('expiryDate') && item.expiryDate === null) {
                                    // @ts-ignore
                                    item.isExpired = false;
                                }

                                return item;
                            });

                        if (this.sort) {
                            return array.sort(this.sort);
                        }
                        return array;
                    }
                );

            this._getEffective = (date: DateType = moment()) => (state: any) => {
                const effectiveItems = this.all(state)
                    .filter((item) => {
                        const expiryDate = this.getExpiryDate(item);
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
