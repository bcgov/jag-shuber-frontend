import * as React from 'react';
import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentDutyForm, AssignmentDutyFormProps } from '../components/AssignmentDutyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { createAssignmentDuty } from '../modules/assignments/actions';
import { getAssignment } from '../modules/assignments/selectors';
import {
    IdType,
    Assignment,
    DateType
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentDutyFormProps> = {
    form: 'CreateAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        let newAssignmentDuty = AssignmentDutyForm.parseAssignmentDutyFromValues(values);
        dispatch(createAssignmentDuty(newAssignmentDuty));
    }
};

export interface AssignmentDutyCreateFormProps extends AssignmentDutyFormProps {
    assignmentId: IdType;
    date: DateType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyCreateFormProps) => {
    const assignment: Assignment = getAssignment(props.assignmentId)(state);
    const defaultTimeRange = {
        startTime: moment().startOf('day').add('hours', 6).toISOString(),
        endTime: moment().startOf('day').add('hours', 17).toISOString()
    };
    return {
        initialValues: {
            timeRange: defaultTimeRange,
            sheriffDuties: [
                {
                    timeRange: {
                        ...defaultTimeRange
                    }
                }
            ]
        },
        assignmentTitle: assignment.title,
        workSectionId: assignment.workSectionId
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentDutyCreateForm extends
    connect<any, {}, AssignmentDutyFormProps>
        (mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
