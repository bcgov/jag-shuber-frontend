import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import Selector from '../../components/FormElements/Selector';

import TextFieldColumn from './TextField';

const MappedTextColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Select Field';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'selectorField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;
    const DisplayComponent = (options && options.selectorComponent) ? options.selectorComponent : Selector;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.displayInfo = false;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? () => TextFieldColumn(undefined, filterComponentOptions) : undefined,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={(p) => (
                        <DisplayComponent {...p} label={label} />
                    )}
                    label={label}
                >
                </Field>
                {/* This wrapper just adds equal spacing to the previous form group */}
                {/* TODO: Where are the spacing utils? */}
                {displayInfo && (
                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                        <Glyphicon glyph="info-sign" />
                    </div>
                )}
            </div>
        ),
        CanceledRender: ({ model }) => (
            <option disabled={true} />
        )
    };
};

export default MappedTextColumn;
