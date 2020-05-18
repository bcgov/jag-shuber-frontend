import * as React from 'react';
import { Field } from 'redux-form';

import * as Types from './types';

import TextField from '../../components/FormElements/TextField';

import * as Validators from '../../infrastructure/Validators';

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
    const required = (options && options.required) ? options.required : false;
    const validators = (options && options.validators) ? options.validators : [];

    // Add required validations if required option is true (it's a shortcut)
    if (required && validators.indexOf(Validators.required) === -1) {
        // console.log('validation required adding validator to field: ' + fieldName);
        validators.unshift(Validators.required);
    }

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.required = false;
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
        FormRenderer: ({ fieldInstanceName , disabled}) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={FieldRenderer}
                label={label}
                onChange={(ev, newValue, previousValue) => {
                    if (ev) {
                        onChange(ev.nativeEvent as Event, newValue, previousValue, `${fieldInstanceName}.${fieldName}`);
                    }
                }}
                disabled={disabled}
                // validate={validators}
            />
        ),
        CanceledRender: () => (<div>TextField Cancelled Display</div>)
    };
};

export default TextFieldColumn;
