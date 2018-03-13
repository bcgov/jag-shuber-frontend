import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAssignment } from '../modules/assignments/selectors';
import { editAssignment } from '../modules/assignments/actions'
import { IdType } from '../api';


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, AssignmentFormProps> = {
    form: 'EditAssignment',
    onSubmit: (values, dispatch, props) => {
        let updatedAssignment = Object.assign({}, { ...values });
        dispatch(editAssignment(updatedAssignment));
    }
};

export interface AssignmentEditFormProps extends AssignmentFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentEditFormProps) => {
    const initialAssignment = getAssignment(props.id)(state);
    if (initialAssignment) {
        return {
            initialValues: initialAssignment,        
            isDefaultTemplate: true
        };
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentEditForm extends connect<any, {}, AssignmentEditFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




