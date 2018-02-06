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


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'CreateAssignmentTemplate',
    onSubmit: (values: { assignment: SheriffAssignment, template: { recurrenceInfo: RecurrenceInfo[] } }, dispatch, props) => {
        const { workSectionId = "OTHER" } = props;
        const { assignment, template} = values;
        assignment.workSectionId = workSectionId;
        let newAssignmentTemplate = Object.assign({}, { assignmentTemplate: assignment, ...template });
        dispatch(createAssignmentTemplate(newAssignmentTemplate));
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class CreateAssignmentTemplateForm extends reduxForm(formConfig)(AssignmentForm) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




