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

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;

    return {
        title: 'Type',
        colStyle: colStyle,
        filterable: filterable,
        filterComponent: (filterable) ? LeaveSubCodeColumn(isPersonal, filterComponentOptions) : undefined,
        FormRenderer: ({ fieldInstanceName , disabled}) => (
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
        CanceledRender: ({ model }) => {
            if (!model) return null;
            return (
                <LeaveSubCodeDisplay subCode={model.leaveSubCode} />
            );
        }
    };
};

export default LeaveSubCodeColumn;
