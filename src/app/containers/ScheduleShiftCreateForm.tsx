import * as React from 'react';
// import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as ScheduleShiftForm, ScheduleShiftFormProps } from '../components/ScheduleShiftForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { createAssignmentDuty } from '../modules/assignments/actions';
// import { getAssignment } from '../modules/assignments/selectors';
// import { 
//     IdType, 
//     Assignment, 
//     AssignmentDuty,
//     DateType
// } from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, ScheduleShiftFormProps> = {
    form: 'CreateScheduleShift',
    onSubmit: (values, dispatch, props) => {
        // let newAssignmentDuty: Partial<AssignmentDuty> = Object.assign({}, { ...values });
        // newAssignmentDuty.assignmentId = props.assignmentId;
        // dispatch(createAssignmentDuty(newAssignmentDuty));
        console.log(values);
    }
};

export interface ScheduleShiftCreateFormProps extends ScheduleShiftFormProps {
    // assignmentId: IdType;
    // date: DateType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftCreateFormProps) => {
    // const assignment: Assignment = getAssignment(props.assignmentId)(state);
    // return {
    //     assignmentTitle: assignment.title,
    //     initialValues: {
    //         startDateTime: moment(props.date).toString(), 
    //         endDateTime: moment(props.date).toString()
    //     }
    // };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class ScheduleShiftCreateForm extends 
    connect<any, {}, ScheduleShiftFormProps>
    (mapStateToProps)(reduxForm(formConfig)(ScheduleShiftForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => (
            <FormSubmitButton {...props} formName={formConfig.form} />
        )
}
