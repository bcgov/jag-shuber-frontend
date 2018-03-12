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
// import { IdType } from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, AssignmentDutyFormProps> = {
    form: 'CreateAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        let newAssignmentDuty = Object.assign({}, { ...values });
        dispatch(createAssignmentDuty(newAssignmentDuty));
    }
};

// export interface AssignmentDutyCreateFormProps extends AssignmentDutyFormProps {
//     id: IdType;
// }

const mapStateToProps = (state: RootState, props: AssignmentDutyFormProps) => {
    return {
        //probably need the assignment ID and assingment title here
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentDutyCreateForm extends connect<any, {}, AssignmentDutyFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




