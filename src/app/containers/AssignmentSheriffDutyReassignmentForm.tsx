import React from 'react';
// import moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import {
    default as SheriffDutyReassignmentForm,
    SheriffDutyReassignmentFormProps
} from '../components/AssignmentSheriffDutyReassignmentForm';
import {
    default as FormSubmitButton,
    SubmitButtonProps
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    getAssignmentDuty, 
    getAssignment, 
} from '../modules/assignments/selectors';
import { getSheriff } from '../modules/sheriffs/selectors';
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
    const { sourceDuty: sourceSheriffDuty, targetDuty: targetSheriffDuty } = props;
    const sourceDuty = getAssignmentDuty(sourceSheriffDuty.dutyId)(state);
    const sourceAssignment = sourceDuty ? getAssignment(sourceDuty.assignmentId)(state) : undefined;
    const sourceSheriff = getSheriff(sourceSheriffDuty.sheriffId)(state);
    const targetDuty = getAssignmentDuty(targetSheriffDuty.dutyId)(state);
    const targetAssignment  = targetDuty ? getAssignment(targetDuty.assignmentId)(state) : undefined;

   
    return {
        initialValues: SheriffDutyReassignmentForm.sheriffDutiesToFormValues(), 
        sourceReassignmentDetails: {
            workSectionId: sourceAssignment ? sourceAssignment.workSectionId : '',
            title: sourceAssignment ? sourceAssignment.title : 'Source Assignment',
            sheriffFirstName: sourceSheriff ? sourceSheriff.firstName : 'Sheriff',
            sheriffLastName: sourceSheriff ? sourceSheriff.lastName : ''
        },
        targetReassignmentDetails: {
            workSectionId: targetAssignment ? targetAssignment.workSectionId : '',
            title: targetAssignment ? targetAssignment.title : 'Target Assignment'
        }
    };
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
    // tslint:disable-next-line:max-line-length
    connect<any, {}, AssignmentSheriffDutyReassignmentFormProps>(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(SheriffDutyReassignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) =>
        <FormSubmitButton {...props} formName={formConfig.form} />
}
