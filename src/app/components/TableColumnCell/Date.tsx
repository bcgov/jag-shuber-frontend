import * as React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import * as Types from './types';

import DateField from '../../components/FormElements/DateField';

const DateColumn = (label: string, fieldName: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        // TODO: Finish me!
        filterComponent: (filterable) ? () => DateColumn('', '', { displayInfo: false, ...options }) : undefined,
        FormRenderer: ({ fieldInstanceName }) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={DateField as any}
                label={label}
            />
        ),
        CanceledRender: ({ model }) => (
            <span>
                {moment(model[fieldName]).format('MMM D, YYYY')}
            </span>
        )
    };
};

export default DateColumn;
