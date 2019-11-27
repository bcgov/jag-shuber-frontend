import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';

import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const RoleCodeColumn = (): Types.TableColumnCell => {
    return {
        title: 'Role',
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`${fieldInstanceName}.leaveSubCode`}
                    component={(p) => <SelectorField
                        {...p}
                        showLabel={false}
                        // TODO: Provide this via props or something so we can use custom codes...
                        SelectorComponent={
                            (sp) =>
                                <LeaveTrainingSubCodeSelector {...sp} />
                            }
                    />}
                    label="Role"
                >
                </Field>
                {/* This wrapper just adds equal spacing to the previous form group */}
                {/* TODO: We need spacing utils */}
                <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                    <Glyphicon glyph="info-sign" />
                </div>
            </div>
        ),
        CanceledRender: ({ leave }) => (
            <LeaveSubCodeDisplay subCode={leave.leaveSubCode} />
        )
    };
};

export default RoleCodeColumn;
