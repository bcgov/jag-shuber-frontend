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
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    getAssignmentDuty, 
    getAssignment, 
    getAssignmentDutyDetailsByDutyId
} from '../modules/assignments/selectors';
import { 
    editAssignmentDuty,
    updateAssignmentDutyDetails 
} from '../modules/assignments/actions';
import { 
    IdType, 
    Assignment, 
    AssignmentDutyDetails
} from '../api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentDutyFormProps> = {
    form: 'EditAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        const { comments, ...rest } = values;
        const updatedAssignmentDuty = AssignmentDutyForm.parseAssignmentDutyFromValues(rest);
        dispatch(editAssignmentDuty(updatedAssignmentDuty));
        
        const updatedAssignmentDutyDetails: Partial<AssignmentDutyDetails> = { 
            assignmentDutyId: updatedAssignmentDuty.id,
            comments
        };
        dispatch(updateAssignmentDutyDetails(updatedAssignmentDutyDetails));
    }
};

export interface AssignmentDutyEditFormProps extends AssignmentDutyFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyEditFormProps) => {
    const initialAssignmentDuty = getAssignmentDuty(props.id)(state);
    const initialAssignmentDutyDetails: AssignmentDutyDetails | undefined 
        = getAssignmentDutyDetailsByDutyId(props.id)(state);
    if (initialAssignmentDuty) {
        const initialAssignment: Assignment = getAssignment(initialAssignmentDuty.assignmentId)(state);
        return {
            initialValues: {
                ...AssignmentDutyForm.assignmentDutyToFormValues(initialAssignmentDuty),
                comments: initialAssignmentDutyDetails ? initialAssignmentDutyDetails.comments : ''
            }, 
            assignmentTitle: initialAssignment.title,
            minTime: TimeUtils.getDefaultTimePickerMinTime(moment(initialAssignmentDuty.startDateTime)),
            maxTime: TimeUtils.getDefaultTimePickerMaxTime(moment(initialAssignmentDuty.endDateTime)),
            workSectionId: initialAssignment.workSectionId,
            isNewDuty: false  
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
