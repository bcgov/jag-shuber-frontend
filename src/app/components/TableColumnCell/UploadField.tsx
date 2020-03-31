import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import UploadField from '../../components/FormElements/UploadField';
import { on } from 'cluster';

// let RENDER_COUNT = 0;
const FieldRenderer = (props: any) => {
    /*if (props.label === 'Role Name') {
        RENDER_COUNT++;
        console.log('DATATABLE TEXTFIELD RENDER COUNT: ' + RENDER_COUNT);
        console.log(props);
    }*/

    return (
        <UploadField
            {...props}
            placeholder={props.placeholder}
            showLabel={false}
        />
    );
}

const UploadFieldColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || '';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'uploadField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const placeholder = (options && options.placeholder) ? options.placeholder : undefined;
    const filterable = false;
    const filterColumn = undefined;
    const onChange = (options && options.onChange) ? options.onChange : undefined;

    // @ts-ignore
    return {
        title: label,
        fieldName,
        colStyle,
        filterable,
        filterComponent: undefined,
        filterColumn,
        displayInfo,
        FormRenderer: ({ fieldInstanceName , disabled}) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={FieldRenderer}
                label={label}
                onChange={onChange}
                disabled={disabled}
            />
        ),
        CanceledRender: () => (<div>UploadField Cancelled Display</div>)
    };
};

export default UploadFieldColumn;
