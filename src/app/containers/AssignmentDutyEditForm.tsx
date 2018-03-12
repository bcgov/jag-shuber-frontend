import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentDutyForm, AssignmentDutyFormProps } from '../components/AssignmentDutyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAssignmentDuty, getAssignment } from '../modules/assignments/selectors';
import { editAssignmentDuty } from '../modules/assignments/actions'
import { 
    IdType, 
    Assignment 
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, AssignmentDutyFormProps> = {
    form: 'EditAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        let updatedAssignmentDuty = Object.assign({}, { ...values });
        dispatch(editAssignmentDuty(updatedAssignmentDuty));
    }
};

export interface AssignmentDutyEditFormProps extends AssignmentDutyFormProps {
    id: IdType;
    assignmentId: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyEditFormProps) => {
    const initialAssignmentDuty = getAssignmentDuty(props.id)(state);
    if (initialAssignmentDuty) {
        const assignment: Assignment = getAssignment(props.assignmentId)(state);
        return {
            initialValues: initialAssignmentDuty, 
            assignmentTitle: assignment.title
        };
    } else {
        return {};
    }
}

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentEditForm extends connect<any, {}, AssignmentDutyEditFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




