import * as React from 'react';
import { Field } from 'redux-form';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';

import LeavePersonalSubCodeSelector from '../../containers/LeavePersonalSubCodeSelector';
import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const LeaveSubCodeColumn = (isPersonal: boolean, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;

    return {
        title: 'Type',
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? () => LeaveSubCodeColumn(isPersonal, options) : undefined,
        FormRenderer: ({ fieldInstanceName }) => (
            <Field
                name={`${fieldInstanceName}.leaveSubCode`}
                component={(p) => <SelectorField
                    {...p}
                    showLabel={false}
                    SelectorComponent={
                        (sp) =>
                            isPersonal
                            ? <LeavePersonalSubCodeSelector {...sp} />
                            : <LeaveTrainingSubCodeSelector {...sp} />
                        }
                />}
                label="Type"
            />
        ),
        CanceledRender: ({ model }) => (
            <LeaveSubCodeDisplay subCode={model.leaveSubCode} />
        )
    };
};

export default LeaveSubCodeColumn;
