import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { createAssignment } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'CreateAssignmentTemplate',
    onSubmit: (values, dispatch, props) => {
        const { recurrenceInfo = [], ...rest } = values;
        let newAssignment = Object.assign({}, {...rest});
        newAssignment.recurrenceInfo = recurrenceInfo.map((element: any) => ({
            days: element.days,
            startTime: element.timeRange.startTime,
            endTime: element.timeRange.endTime,
            sheriffsRequired: element.sheriffsRequired
        }));
        dispatch(createAssignment(newAssignment));
    }
};

const mapStateToProps = (state: RootState, props: AssignmentFormProps) => {
    return {
        initialValues: {workSectionId: props.workSectionId},
        isDefaultTemplate: true
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
// tslint:disable-next-line:max-line-length
export default class AssignmentTemplateCreateForm extends connect<any, {}, AssignmentFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
    static SubmitButton = 
        (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />
}
