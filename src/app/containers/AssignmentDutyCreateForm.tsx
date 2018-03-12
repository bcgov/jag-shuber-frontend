import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentDutyForm, AssignmentDutyFormProps } from '../components/AssignmentDutyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';
import { createAssignmentDuty } from '../modules/assignments/actions';
import { getAssignment } from '../modules/assignments/selectors';
import { 
    IdType, 
    Assignment, 
    AssignmentDuty
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, AssignmentDutyFormProps> = {
    form: 'CreateAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        let newAssignmentDuty: Partial<AssignmentDuty> = Object.assign({}, { ...values });
        newAssignmentDuty.assignmentId = props.assignmentId;
        dispatch(createAssignmentDuty(newAssignmentDuty));
    }
};

export interface AssignmentDutyCreateFormProps extends AssignmentDutyFormProps {
    assignmentId: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyFormProps) => {
    const assignment: Assignment = getAssignment(props.assignmentId)(state);
    return {
        assignmentTitle: assignment.title
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentDutyCreateForm extends connect<any, {}, AssignmentDutyFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




