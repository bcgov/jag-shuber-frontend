import * as React from 'react';
import { Field } from 'redux-form';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';

import LeavePersonalSubCodeSelector from '../../containers/LeavePersonalSubCodeSelector';
import LeaveTrainingSubCodeSelector from '../../containers/LeaveTrainingSubCodeSelector';
import LeaveSubCodeDisplay from '../../containers/LeaveSubCodeDisplay';

const LeaveSubCodeColumn = (isPersonal: boolean): Types.TableColumnCell => {
    return {
        title: 'Type',
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
        CanceledRender: ({ leave }) => (
            <LeaveSubCodeDisplay subCode={leave.leaveSubCode} />
        )
    };
};

export default LeaveSubCodeColumn;
