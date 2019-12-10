import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';
import Selector from '../../components/FormElements/Selector';

// TODO: Provide code selectors as a prop
// import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
// import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const SelectorFieldColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Select Field';

    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const disabled = (options && options.disabled) ? options.disabled : false;

    return {
        title: label,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`${fieldInstanceName}.leaveSubCode`}
                    component={(p) => <SelectorField
                        {...p}
                        showLabel={false}
                        disabled={disabled}
                        // TODO: Provide this via props or something so we can use custom codes...
                        SelectorComponent={
                            (sp) =>
                                // TODO: Actually make this work
                                <Selector {...sp} label={label} data={[]}/>
                            }
                    />}
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

export default SelectorFieldColumn;
