import * as React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import * as Types from './types';

import DateField from '../../components/FormElements/DateField';

const DateColumn = (label: string, fieldName: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: label,
        colStyle: colStyle,
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
