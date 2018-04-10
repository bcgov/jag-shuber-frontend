import * as React from 'react';
import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAssignment } from '../modules/assignments/selectors';
import { editAssignment } from '../modules/assignments/actions';
import { IdType, Assignment } from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'EditAssignment',
    onSubmit: (values, dispatch, props) => {
        const {recurrenceInfo = [], ...rest} = values;
        let updatedAssignment = Object.assign({}, { ...rest });
        updatedAssignment.recurrenceInfo = recurrenceInfo.map((element: any) => ({
            days: element.days,
            startTime: element.timeRange.startTime,
            endTime: element.timeRange.endTime,
            sheriffsRequired: element.sheriffsRequired
        }));
        dispatch(editAssignment(updatedAssignment));
    }
};

export interface AssignmentEditFormProps extends AssignmentFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentEditFormProps) => {
    const initialAssignment: Assignment = getAssignment(props.id)(state);
    if (initialAssignment) {
        const { recurrenceInfo = [] } = initialAssignment;
        const foo =  {
            initialValues: {
                ...initialAssignment,
                recurrenceInfo: recurrenceInfo.map(({startTime, endTime, ...rest}) => ({
                    ...rest,
                    timeRange: {
                        startTime: moment(startTime).toISOString(), 
                        endTime: moment(endTime).toISOString()
                    }
                }))
            },
            workSectionId: initialAssignment.workSectionId,
            isDefaultTemplate: true
        };
        return foo;
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
// tslint:disable-next-line:max-line-length
export default class AssignmentEditForm extends connect<any, {}, AssignmentEditFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
    // tslint:disable-next-line:max-line-length
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}


