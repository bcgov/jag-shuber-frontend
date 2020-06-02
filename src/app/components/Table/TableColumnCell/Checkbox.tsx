import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import CheckboxField from '../../FormElements/CheckboxField';

const CheckboxColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || '';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'checkboxField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? CheckboxColumn(label, filterComponentOptions) : undefined,
        displayInfo,
        FormRenderer: ({ fieldInstanceName , disabled}) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={(p) => <CheckboxField
                    {...p}
                    showLabel={false}
                    // TODO: Provide this via props or something so we can use custom codes...
                />}
                label={label}
            />
        ),
        CanceledRender: () => (<div>CheckboxField Cancelled Display</div>)
    };
};

export default CheckboxColumn;
