import * as React from 'react';
// import * as moment from 'moment';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import {
    SheriffAssignment,
    RecurrenceInfo
} from '../api/index';
import { createAssignmentTemplate } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'CreateAssignmentTemplate',
    onSubmit: (values: { assignment: SheriffAssignment, recurrenceInfo: RecurrenceInfo[] }, dispatch, props) => {
        let newAssignmentTemplate = Object.assign({}, { ...values });
        dispatch(createAssignmentTemplate(newAssignmentTemplate));
    }
};

const mapStateToProps = (state: RootState, props: AssignmentFormProps) => {
    return {
        initialValues: {assignment: {workSectionId: props.workSectionId}},
        isDefaultTemplate: true
    }
}



// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentTemplateCreateForm extends connect<any, {}, AssignmentFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




