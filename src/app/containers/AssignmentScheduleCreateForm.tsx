import React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    DaysOfWeek, Assignment, CourtAssignment, JailAssignment, EscortAssignment, OtherAssignment,
} from '../api/Api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import { visibleTime } from '../modules/schedule/selectors';
import AssignmentForm, { CourtSecurityFields, AssignmentFormProps } from '../components/AssignmentForm';
import { createAssignment } from '../modules/assignments/actions';
import { allAssignments } from '../modules/assignments/selectors';
import { DateType } from 'jag-shuber-api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = {
    form: 'CreateAssignmentSchedule',
    onSubmit: async (values, dispatch, props) => {
        const { workSectionId } = props;
        //const { timeRange, assignmentId } = values;
        let assignments: Assignment[] = [];
        //const updatedAssignment = AssignmentForm.parseAssignmentFromValues(values);
        const { 
            jailRoleCode,
            courtAssignmentId,
            escortRunId,
            otherAssignCode,
        } = values;
        
        const courtAssignment = CourtSecurityFields.courtAssignmentIdToAssignmentValue(courtAssignmentId);
        const isCourtroomAssignment = CourtSecurityFields.isCourtAssignmentIdCourtroom(courtAssignmentId);
        const courtroomId = (isCourtroomAssignment ? courtAssignment : undefined);
        const courtRoleId = (!isCourtroomAssignment ? courtAssignment : undefined);

        let assignment: Assignment | undefined;
        let workSectionAssignments = assignments!.filter(a => a.workSectionId == workSectionId); 
        switch (workSectionId)
        {
            case 'COURTS':
            {
                assignment = workSectionAssignments.find((a) => (a as CourtAssignment).courtRoleId == courtRoleId && (a as CourtAssignment).courtroomId == courtroomId);
                assignment = assignment || { courtroomId, courtRoleId, workSectionId: 'COURTS' } as CourtAssignment;
                break;
            }
            case 'JAIL':
            {
                assignment = workSectionAssignments.find((a) => (a as JailAssignment).jailRoleCode == jailRoleCode);
                assignment = assignment || { jailRoleCode, workSectionId: 'JAIL' } as JailAssignment;
                break;
            }
            case 'ESCORTS':
            {
                assignment = workSectionAssignments.find((a) => (a as EscortAssignment).escortRunId == escortRunId);
                assignment = assignment || { escortRunId, workSectionId: 'ESCORTS' } as EscortAssignment;
                break;
            }
            default:
            {
                assignment = workSectionAssignments.find((a) => (a as OtherAssignment).otherAssignCode == otherAssignCode);
                assignment = assignment || { otherAssignCode, workSectionId: 'OTHER' } as OtherAssignment;
            }
        }
        if (!assignment.id)
        {
            const result = await dispatch(createAssignment(assignment));
            assignment.id = result.id;
        }
    }
};

export interface AssignmentScheduleCreateFormProps extends AssignmentFormProps {
    weekStart: DateType;
}

const mapStateToProps = (state: RootState, props: AssignmentScheduleCreateFormProps) => {
    return {
        initialValues: {
            timeRange: {
                startTime: TimeUtils.getDefaultStartTime().toISOString(),
                endTime: TimeUtils.getDefaultEndTime().toISOString()
            },
            days: DaysOfWeek.Weekdays,
            repeatNumber: 1
        },
        weekStart: visibleTime(state).visibleTimeStart,
        assignments: allAssignments(state)
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentScheduleCreateForm extends 
    connect<any, {}, AssignmentScheduleCreateFormProps>
    (mapStateToProps)(reduxForm(formConfig)(AssignmentForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => (
            <FormSubmitButton {...props} formName={formConfig.form} />
        )
}