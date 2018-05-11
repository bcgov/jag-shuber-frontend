import * as React from 'react';
import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as ScheduleShiftCopyForm, ScheduleShiftCopyFormProps } from '../components/ScheduleShiftCopyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    ShiftCopyOptions 
} from '../api/Api';
import { copyShiftsFromPrevWeek } from '../modules/shifts/actions';
import { visibleTime } from '../modules/schedule/selectors';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, ScheduleShiftCopyFormProps> = {
    form: 'CopyScheduleShift',
    onSubmit: (values, dispatch, props) => {
        let copyOptions: Partial<ShiftCopyOptions> = Object.assign({}, {...values});
        copyOptions.startOfWeekSource = props.weekStartSource;
        copyOptions.startOfWeekDestination = props.weekStartDestination;
        dispatch(copyShiftsFromPrevWeek(copyOptions as ShiftCopyOptions));
    }
};

export interface ScheduleShiftCopyFormProps extends ScheduleShiftCopyFormProps {
}

// tslint:disable-next-line:no-empty
const mapStateToProps = (state: RootState, props: ScheduleShiftCopyFormProps) => {
    const currentVisibleStart = visibleTime(state).visibleTimeStart;
    const destination = moment(currentVisibleStart);
    const source = moment(currentVisibleStart).subtract('week', 1);
    return {
        weekStartDestination: destination,
        weekStartSource: source,
        initialValues: {
            shouldIncludeSheriffs: false
        }
    };
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class ScheduleShiftCreateForm extends 
    connect<any, {}, ScheduleShiftCopyFormProps>
    (mapStateToProps)(reduxForm(formConfig)(ScheduleShiftCopyForm)) {
        static SubmitButton = (props: Partial<SubmitButtonProps>) => (
            <FormSubmitButton {...props} formName={formConfig.form} />
        )
}
