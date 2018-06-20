import * as React from 'react';
import { reduxForm, ConfigProps, SubmissionError } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { createAssignment } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { DaysOfWeek } from '../api/Api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import * as Validators from '../infrastructure/Validators';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'CreateAssignmentTemplate',
    validate: (values) => {
        const errors: any = {};
        let recurrenceArrayErrors: any[] = [];
        if (values.dutyRecurrences && values.dutyRecurrences.length > 0){
            values.dutyRecurrences.forEach((recurrence: any, recurrenceIndex: any) => {
                if (recurrence) {
                    const validateSheriffsRequired = (value: any) => (
                        [Validators.required, Validators.max10, Validators.min1]
                            .map(v => v(value))
                            .filter(m => m != undefined)
                            .join(', ')
                    );
                    recurrenceArrayErrors[recurrenceIndex] = {
                        sheriffsRequired: validateSheriffsRequired(recurrence.sheriffsRequired)
                    };
                }
            });
        }
        if (recurrenceArrayErrors.length) {
            errors.dutyRecurrences = recurrenceArrayErrors;        
        }

        return errors;
    },
    onSubmit: async (values, dispatch, props) => {
        try {
            const newAssignment = AssignmentForm.parseAssignmentFromValues(values);
            await dispatch(createAssignment(newAssignment));
        } catch (e) {
            throw new SubmissionError({ _error: e.message });
        }
    }
};

const mapStateToProps = (state: RootState, props: AssignmentFormProps) => {
    return {
        initialValues: { 
            workSectionId: props.workSectionId,
            dutyRecurrences: [
                {
                    daysBitmap: DaysOfWeek.Weekdays,
                    timeRange: TimeUtils.getDefaultTimeRange(),
                    sheriffsRequired: 1
                    
                }
            ] 
        },
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
