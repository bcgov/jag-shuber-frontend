import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import TextArea from '../../components/FormElements/TextArea';

import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const TextAreaColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Text Area';

    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;

    return {
        title: label,
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`${fieldInstanceName}.leaveSubCode`}
                    rows="1" // TODO: Ability to set number of rows and cols
                    component={(p) => <TextArea
                        {...p}
                        showLabel={false}
                        // TODO: Provide this via props or something so we can use custom codes...
                    />}
                    label={label}
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
        CanceledRender: ({ model }) => (<div>TextField Cancelled Display</div>)
    };
};

export default TextAreaColumn;
