import React from 'react';
import {
    reduxForm,
    ConfigProps,
    submit,
    SubmissionError
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
} from '../api';
import { deleteDutyRecurrence } from '../modules/assignments/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'EditAssignment',
    validate: (values) => AssignmentForm.validateForm(values),
    onSubmit: (values, dispatch, props) => {
        try {
            if (AssignmentForm.duplicateCheck(values, props.assignments))
            {
                throw new Error("Assignment cannot be added. <br /> This assignment already exists in Duty Roster Set-Up or in the Current Week.");
            }
            const updatedAssignment = AssignmentForm.parseAssignmentFromValues(values);
            dispatch(editAssignment(updatedAssignment));
        } catch (e) {
            throw new SubmissionError({ _error: e.message });
        }
    }
};

export interface AssignmentEditFormProps extends AssignmentFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentEditFormProps) => {
    const initialAssignment = getAssignment(props.id)(state);
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

    static submitAction() {
        return submit(formConfig.form);
    }
    
}
