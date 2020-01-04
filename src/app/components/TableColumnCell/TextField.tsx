import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import TextField from '../../components/FormElements/TextField';
import { on } from 'cluster';

// let RENDER_COUNT = 0;
const FieldRenderer = (props: any) => {
    /*if (props.label === 'Role Name') {
        RENDER_COUNT++;
        console.log('DATATABLE TEXTFIELD RENDER COUNT: ' + RENDER_COUNT);
        console.log(props);
    }*/

    return (
        <TextField
            {...props}
            placeholder={props.placeholder}
            showLabel={false}
        />
    );
}

const TextFieldColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || '';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'textField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const placeholder = (options && options.placeholder) ? options.placeholder : undefined;
    const filterable = (options && options.filterable) ? options.filterable : false;
    const filterColumn = (options && options.filterColumn) ? options.filterColumn : undefined;
    const onChange = (options && options.onChange) ? options.onChange : () => {};

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.onChange = filterColumn;
    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;
    filterComponentOptions.placeholder = `Filter ${label}`;

    // @ts-ignore
    return {
        title: label,
        fieldName,
        colStyle,
        filterable,
        filterComponent: (filterable) ? TextFieldColumn(label, filterComponentOptions) : undefined,
        filterColumn,
        displayInfo,
        FormRenderer: ({ fieldInstanceName }) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={FieldRenderer}
                label={label}
                onChange={onChange}
            />
        ),
        CanceledRender: ({ model }) => (<div>TextField Cancelled Display</div>)
    };
};

export default TextFieldColumn;
