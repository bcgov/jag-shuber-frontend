import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import TextFieldColumn from './TextField';

const StaticTextColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || '';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'textField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const placeholder = (options && options.placeholder) ? options.placeholder : undefined;
    const filterable = (options && options.filterable) ? options.filterable : false;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.displayInfo = false;
    filterComponentOptions.placeholder = `Filter ${label}`;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? () => TextFieldColumn(label, filterComponentOptions) : undefined,
        displayInfo,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    // TODO: Pass in field name as prop or whatever
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={(p) => <span className="table-cell-text">{p.input.value}</span>}
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
        CanceledRender: ({ model }) => (<div>StaticText Cancelled Display</div>)
    };
};

export default StaticTextColumn;
