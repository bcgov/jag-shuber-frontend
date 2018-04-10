import * as React from 'react';
import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { 
    default as AssignmentDutyForm, 
    AssignmentDutyFormProps 
} from '../components/AssignmentDutyForm';
import { 
    default as FormSubmitButton, 
    SubmitButtonProps 
} from '../components/FormElements/SubmitButton'
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    getAssignmentDuty, 
    getAssignment 
} from '../modules/assignments/selectors';
import { editAssignmentDuty } from '../modules/assignments/actions';
import { 
    IdType, 
    Assignment 
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentDutyFormProps> = {
    form: 'EditAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        const { timeRange: {startTime, endTime}, ...rest } = values;
        const updatedAssignmentDuty = Object.assign({}, ...rest);
        updatedAssignmentDuty.startDateTime = startTime;
        updatedAssignmentDuty.endDateTime = endTime;
        dispatch(editAssignmentDuty(updatedAssignmentDuty));
    }
};

export interface AssignmentDutyEditFormProps extends AssignmentDutyFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyEditFormProps) => {
    const initialAssignmentDuty = getAssignmentDuty(props.id)(state);
    if (initialAssignmentDuty) {
        const initialAssignment: Assignment = getAssignment(initialAssignmentDuty.assignmentId)(state);
        return {
            initialValues: {
                ...initialAssignmentDuty,
                timeRange: {
                    startTime: moment(initialAssignmentDuty.startDateTime).toISOString(), 
                    endTime: moment(initialAssignmentDuty.endDateTime).toISOString()
                }
            }, 
            assignmentTitle: initialAssignment.title,
            minTime: moment(initialAssignmentDuty.startDateTime).startOf('day').add('hours', 6).toISOString(),
            maxTime: moment(initialAssignmentDuty.endDateTime).startOf('day').add('hours', 22).toISOString(),
            workSectionId: initialAssignment.workSectionId
        };
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentEditForm extends 
    connect<any, {}, AssignmentDutyEditFormProps>(mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
