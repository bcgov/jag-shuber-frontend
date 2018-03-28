import * as React from 'react';
import * as moment from 'moment';
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

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, ScheduleShiftFormProps> = {
    form: 'CopyScheduleShift',
    onSubmit: (values, dispatch, props) => {
        const { weekStart } = props;
        let newShiftCreatorPayload: Partial<ShiftCreationPayload> = Object.assign({}, {...values});
        newShiftCreatorPayload.weekStart = weekStart;
        dispatch(createShifts(newShiftCreatorPayload as ShiftCreationPayload));
    }
};

export interface ScheduleShiftCreateFormProps extends ScheduleShiftFormProps {
    weekStart: DateType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftCreateFormProps) => {
    return {
        initialValues: {
            startTime: moment().hour(9).minute(0),
            endTime: moment().hour(17).minute(0),
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
