import React from 'react';
import moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as AssignmentDutyForm, AssignmentDutyFormProps } from '../components/AssignmentDutyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    createAssignmentDuty
} from '../modules/assignments/actions';
import { getAssignment } from '../modules/assignments/selectors';
import { visibleTime } from '../modules/timeline/selectors';
import {
    IdType,
    DateType
} from '../api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentDutyFormProps> = {
    form: 'CreateAssignmentDuty',
    onSubmit: async (values, dispatch, props) => {
        const { assignmentId = '-1' } = props;
        // const { comments, ...rest } = values;
        let newAssignmentDuty = AssignmentDutyForm.parseAssignmentDutyFromValues(values);
        newAssignmentDuty.assignmentId = assignmentId;
        await dispatch(createAssignmentDuty(newAssignmentDuty));
    }
};

export interface AssignmentDutyCreateFormProps extends AssignmentDutyFormProps {
    assignmentId: IdType;
    date: DateType;
}

const mapStateToProps = (state: RootState, props: AssignmentDutyCreateFormProps) => {
    const assignment = getAssignment(props.assignmentId)(state);
    const currentVisibleTime = visibleTime(state);
    const currentVisibleStartMoment = moment(currentVisibleTime.visibleTimeStart);

    const defaultTimeRange = {
        startTime: TimeUtils.getDefaultStartTime(currentVisibleStartMoment).toISOString(),
        endTime: TimeUtils.getDefaultEndTime(currentVisibleStartMoment).toISOString()
    };

    return {
        initialValues: {
            timeRange: defaultTimeRange,
            sheriffDuties: [
                {
                    timeRange: {
                        ...defaultTimeRange
                    }
                }
            ]
        },
        minTime: TimeUtils.getDefaultTimePickerMinTime(currentVisibleStartMoment).toISOString(),
        maxTime: TimeUtils.getDefaultTimePickerMaxTime(currentVisibleStartMoment).toISOString(),
        assignmentTitle: assignment ? assignment.title : '',
        workSectionId: assignment ? assignment.workSectionId : undefined,
        isNewDuty: true
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentDutyCreateForm extends
    connect<any, {}, AssignmentDutyFormProps>
        (mapStateToProps)(reduxForm(formConfig)(AssignmentDutyForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
