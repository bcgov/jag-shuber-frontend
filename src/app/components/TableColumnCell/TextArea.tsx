import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import TextArea from '../../components/FormElements/TextArea';

import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';
import TextFieldColumn from './TextField';

const TextAreaColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Text Area';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'textAreaField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const placeholder = (options && options.placeholder) ? options.placeholder : undefined;
    const filterable = (options && options.filterable) ? options.filterable : false;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;
    filterComponentOptions.placeholder = `Filter ${label}`;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? TextAreaColumn(label, filterComponentOptions) : undefined,
        displayInfo,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`${fieldInstanceName}.${fieldName}`}
                    rows="1" // TODO: Ability to set number of rows and cols
                    component={(p) => <TextArea
                        {...p}
                        placeholder={placeholder}
                        showLabel={false}
                        // TODO: Provide this via props or something so we can use custom codes...
                    />}
                    label={label}
                />
                {/* This wrapper just adds equal spacing to the previous form group */}
                {/* TODO: We need spacing utils */}
                {/*displayInfo && (
                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                        <Glyphicon glyph="info-sign" />
                    </div>
                )*/}
            </div>
        ),
        CanceledRender: ({ model }) => (<div>TextField Cancelled Display</div>)
    };
};

export default TextAreaColumn;
