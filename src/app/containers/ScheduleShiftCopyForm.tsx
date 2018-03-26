import * as React from 'react';
// import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { default as ScheduleShiftCopyForm, ScheduleShiftCopyFormProps } from '../components/ScheduleShiftCopyForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    DateType, ShiftCopyInstructions 
} from '../api/Api';
import { copyShiftsFromPrevWeek } from '../modules/shifts/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, ScheduleShiftCopyFormProps> = {
    form: 'CopyScheduleShift',
    onSubmit: (values, dispatch, props) => {
        let copyInstructions: Partial<ShiftCopyInstructions> = Object.assign({}, {...values});
        if (copyInstructions.copySelection === undefined) {
            copyInstructions.copySelection = 'shiftsOnly';
        }
        copyInstructions.startOfWeekToCopy = props.copyWeekStart;
        copyInstructions.startOfWeekToCreate = props.createWeekStart;
        dispatch(copyShiftsFromPrevWeek(copyInstructions as ShiftCopyInstructions));
    }
};

export interface ScheduleShiftCreateFormProps extends ScheduleShiftCopyFormProps {
    copyWeekStart: DateType;
}

// tslint:disable-next-line:no-empty
const mapStateToProps = (state: RootState, props: ScheduleShiftCreateFormProps) => {
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
