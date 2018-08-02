import React from 'react';
// import moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { 
    default as SheriffDutyReassignmentForm, 
    AssignmentDutyFormProps as SheriffDutyReassignmentFormProps 
} from '../components/AssignmentSheriffDutyReassignmentForm';
import { 
    default as FormSubmitButton, 
    SubmitButtonProps 
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { 
//     getAssignmentDuty, 
//     getAssignment, 
// } from '../modules/assignments/selectors';
// import { 
//     editAssignmentDuty,
// } from '../modules/assignments/actions';
// import { 
//     IdType, 
// } from '../api';
// import * as TimeUtils from '../infrastructure/TimeRangeUtils';
// import { deleteSheriffDuty } from '../modules/assignments/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, SheriffDutyReassignmentFormProps> = {
    form: 'ReassignSheriffDutyForm',
    onSubmit: (values, dispatch, props) => {
        // const { comments, ...rest } = values;
        // const updatedAssignmentDuty = SheriffDutyReassignmentForm.parseAssignmentDutyFromValues(values);
        // dispatch(editAssignmentDuty(updatedAssignmentDuty));
    }
};

export interface AssignmentSheriffDutyReassignmentFormProps extends SheriffDutyReassignmentFormProps {
    // id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentSheriffDutyReassignmentFormProps) => {
    // const initialAssignmentDuty = getAssignmentDuty(props.id)(state);
    // if (initialAssignmentDuty) {
    //     const initialAssignment = getAssignment(initialAssignmentDuty.assignmentId)(state);

    //     return {
    //         initialValues: AssignmentDutyForm.assignmentDutyToFormValues(initialAssignmentDuty), 
    //         assignmentTitle: initialAssignment ? initialAssignment.title : '',
    //         minTime: TimeUtils.getDefaultTimePickerMinTime(moment(initialAssignmentDuty.startDateTime)),
    //         maxTime: TimeUtils.getDefaultTimePickerMaxTime(moment(initialAssignmentDuty.endDateTime)),
    //         workSectionId: initialAssignment ? initialAssignment.workSectionId : undefined,
    //         isNewDuty: false  
    //     };
    // } else {
    //     return {};
    // }
};

const mapDispatchToProps = {
    // onRemoveSheriffDuty: deleteSheriffDuty
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentSheriffDutyReassignmentForm extends 
    connect<any, {}, AssignmentSheriffDutyReassignmentFormProps>(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(SheriffDutyReassignmentForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
