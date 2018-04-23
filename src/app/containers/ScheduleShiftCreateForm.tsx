import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as ScheduleShiftForm, ScheduleShiftFormProps } from '../components/ScheduleShiftForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    DaysOfWeek,
    DateType 
} from '../api/Api';
import { 
    ShiftCreationPayload
} from '../api/utils';
import { createShifts } from '../modules/shifts/actions';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleShiftFormProps> = {
    form: 'CreateScheduleShift',
    onSubmit: (values, dispatch, props) => {
        const { weekStart } = props;
        const { timeRange, ...rest} = values;
        let newShiftCreatorPayload: Partial<ShiftCreationPayload> = Object.assign({}, {...rest});
        newShiftCreatorPayload.weekStart = weekStart;
        newShiftCreatorPayload.startTime = timeRange.startTime;
        newShiftCreatorPayload.endTime = timeRange.endTime;
        dispatch(createShifts(newShiftCreatorPayload as ShiftCreationPayload));
    }
};

export interface ScheduleShiftCreateFormProps extends ScheduleShiftFormProps {
    weekStart: DateType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftCreateFormProps) => {
    return {
        initialValues: {
            timeRange: {
                startTime: TimeUtils.getDefaultStartTime().toISOString(),
                endTime: TimeUtils.getDefaultEndTime().toISOString()
            },
            days: DaysOfWeek.Weekdays,
            repeatNumber: 1
        }
    };
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
