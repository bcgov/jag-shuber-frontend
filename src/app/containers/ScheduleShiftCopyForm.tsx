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
    DateType 
} from '../api/Api';
// import { 
//     ShiftCreationPayload
// } from '../api/utils';
// import { createShifts } from '../modules/shifts/actions';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<{}, ScheduleShiftCopyFormProps> = {
    form: 'CopyScheduleShift',
    onSubmit: (values, dispatch, props) => {
        console.log(values);
        // const { weekStart } = props;
        // let newShiftCreator: Partial<ShiftCreationPayload> = Object.assign({}, {...values});
        // newShiftCreator.weekStart = weekStart;
        // dispatch(createShifts(newShiftCreator as ShiftCreationPayload));
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
