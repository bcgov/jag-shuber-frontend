import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import DateColumn from './Date';

const StaticDateColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || '';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'textField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        // TODO: Finish me!
        filterComponent: (filterable) ? () => DateColumn('', '', options) : undefined,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    // TODO: Pass in field name as prop or whatever
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={(p) => <span className="table-cell-text">{new Date(p.input.value).toDateString()}</span>}
                />
                {/* This wrapper just adds equal spacing to the previous form group */}
                {/* TODO: We need spacing utils */}
                {displayInfo && (
                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                        <Glyphicon glyph="info-sign" />
                    </div>
                )}
            </div>
        ),
        CanceledRender: ({ model }) => (<div>StaticDate Cancelled Display</div>)
    };
};

export default StaticDateColumn;
