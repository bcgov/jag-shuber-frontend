import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import {
    Assignment,
    RecurrenceInfo
} from '../api/index';
import { editAssignmentTemplate } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAssignmentTemplate } from '../modules/assignments/selectors';


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'EditAssignmentTemplate',
    onSubmit: (values: { id: number, assignment: Assignment, recurrenceInfo: RecurrenceInfo[] }, dispatch, props) => {
        let updatedAssignmentTemplate = Object.assign({}, { ...values });
        dispatch(editAssignmentTemplate(updatedAssignmentTemplate));
    }
};

export interface AssignmentTemplateEditFormProps extends AssignmentFormProps {
    id: number;
}

const mapStateToProps = (state: RootState, props: AssignmentTemplateEditFormProps) => {
    const initialTemplate = getAssignmentTemplate(props.id)(state);
    if (initialTemplate) {
        return {
            initialValues: initialTemplate,
            workSectionId: initialTemplate.assignment.workSectionId,
            isDefaultTemplate: true
        }
    }
    else {
        return {}
    }

}

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentTemplateEditForm extends connect<any, {}, AssignmentTemplateEditFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




