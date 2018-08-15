import React from 'react';
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
import { reassignSheriffDuty } from '../modules/assignments/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, SheriffDutyReassignmentFormProps> = {
    form: 'ReassignSheriffDutyForm',
    onSubmit: (values, dispatch, props) => {
        const { sourceDutyEndTime, targetDutyStartTime } = values;
        const { sourceDuty, targetDuty } = props;
        dispatch(reassignSheriffDuty({
            newSourceDutyEndTime: sourceDutyEndTime,
            sourceSheriffDuty: sourceDuty,
            newTargetDutyStartTime: targetDutyStartTime,
            targetSheriffDuty: targetDuty
        }));
    }
};

export interface AssignmentSheriffDutyReassignmentFormProps extends SheriffDutyReassignmentFormProps {
}

const mapStateToProps = (state: RootState, props: AssignmentSheriffDutyReassignmentFormProps) => {
    const { sourceDuty: sourceSheriffDuty, targetDuty: targetSheriffDuty } = props;
    const sourceDuty = getAssignmentDuty(sourceSheriffDuty.dutyId)(state);
    const sourceAssignment = sourceDuty ? getAssignment(sourceDuty.assignmentId)(state) : undefined;
    const sourceSheriff = getSheriff(sourceSheriffDuty.sheriffId)(state);
    const targetDuty = getAssignmentDuty(targetSheriffDuty.dutyId)(state);
    const targetAssignment = targetDuty ? getAssignment(targetDuty.assignmentId)(state) : undefined;

    return {
        initialValues: SheriffDutyReassignmentForm.reassignmentDetailsFormValues(sourceSheriffDuty, targetSheriffDuty),
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
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentSheriffDutyReassignmentForm extends
    // tslint:disable-next-line:max-line-length
    connect<any, {}, AssignmentSheriffDutyReassignmentFormProps>(mapStateToProps, {})(reduxForm(formConfig)(SheriffDutyReassignmentForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) =>
        <FormSubmitButton {...props} formName={formConfig.form} />
}
