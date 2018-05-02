import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import {
    default as AssignmentForm,
    AssignmentFormProps
} from '../components/AssignmentForm';
import {
    default as FormSubmitButton,
    SubmitButtonProps
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAssignment } from '../modules/assignments/selectors';
import { editAssignment } from '../modules/assignments/actions';
import {
    IdType,
    Assignment
} from '../api';
import { deleteDutyRecurrence } from '../modules/assignments/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'EditAssignment',
    onSubmit: (values, dispatch, props) => {
        const updatedAssignment = AssignmentForm.parseAssignmentFromValues(values);
        dispatch(editAssignment(updatedAssignment));
    }
};

export interface AssignmentEditFormProps extends AssignmentFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentEditFormProps) => {
    const initialAssignment: Assignment = getAssignment(props.id)(state);
    if (initialAssignment) {
        return {
            initialValues: AssignmentForm.assignmentToFormValues(initialAssignment),
            workSectionId: initialAssignment.workSectionId,
            isDefaultTemplate: true
        };
    } else {
        return {};
    }
};

const mapDispatchToProps = {
    onRemoveDutyRecurrence: deleteDutyRecurrence
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
// tslint:disable-next-line:max-line-length
export default class AssignmentEditForm extends connect<any, {}, AssignmentEditFormProps>(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(AssignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
