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
    // getAssignmentDutyDetailsByDutyId
} from '../modules/assignments/selectors';
import { 
    editAssignmentDuty,
    // updateAssignmentDutyDetails 
} from '../modules/assignments/actions';
import { 
    IdType, 
    // AssignmentDutyDetails
} from '../api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import { deleteSheriffDuty } from '../modules/assignments/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentDutyFormProps> = {
    form: 'EditAssignmentDuty',
    onSubmit: (values, dispatch, props) => {
        // const { comments, ...rest } = values;
        const updatedAssignmentDuty = AssignmentDutyForm.parseAssignmentDutyFromValues(values);
        dispatch(editAssignmentDuty(updatedAssignmentDuty));
        
        // const updatedAssignmentDutyDetails: Partial<AssignmentDutyDetails> = { 
        //     assignmentDutyId: updatedAssignmentDuty.id,
        //     comments
        // };
        // dispatch(updateAssignmentDutyDetails(updatedAssignmentDutyDetails));
    }
};

export interface AssignmentDutyEditFormProps extends AssignmentDutyFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyEditFormProps) => {
    const initialAssignmentDuty = getAssignmentDuty(props.id)(state);
    // const initialAssignmentDutyDetails: AssignmentDutyDetails | undefined 
    //     = getAssignmentDutyDetailsByDutyId(props.id)(state);
    if (initialAssignmentDuty) {
        const initialAssignment = getAssignment(initialAssignmentDuty.assignmentId)(state);

        return {
            initialValues: AssignmentDutyForm.assignmentDutyToFormValues(initialAssignmentDuty), 
            assignmentTitle: initialAssignment ? initialAssignment.title : '',
            minTime: TimeUtils.getDefaultTimePickerMinTime(moment(initialAssignmentDuty.startDateTime)),
            maxTime: TimeUtils.getDefaultTimePickerMaxTime(moment(initialAssignmentDuty.endDateTime)),
            workSectionId: initialAssignment ? initialAssignment.workSectionId : undefined,
            isNewDuty: false  
        };
    } else {
        return {};
    }
};

const mapDispatchToProps = {
    onRemoveSheriffDuty: deleteSheriffDuty
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentEditForm extends 
    connect<any, {}, AssignmentDutyEditFormProps>(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
