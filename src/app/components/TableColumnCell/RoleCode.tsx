import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';

import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const RoleCodeColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Role Name';

    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.displayInfo = false;

    return {
        title: label,
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? () => RoleCodeColumn(label, filterComponentOptions) : undefined,
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
                    label={label}
                >
                </Field>
                {/* This wrapper just adds equal spacing to the previous form group */}
                {/* TODO: We need spacing utils */}
                <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                    <Glyphicon glyph="info-sign" />
                </div>
            </div>
        ),
        CanceledRender: ({ model }) => (
            <LeaveSubCodeDisplay subCode={model.leaveSubCode} />
        )
    };
};

export default RoleCodeColumn;
