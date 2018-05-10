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
import { getShift } from '../modules/shifts/selectors';
import { editShift } from '../modules/shifts/actions';
import { 
    IdType
} from '../api';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleShiftFormProps> = {
    form: 'EditShift',
    onSubmit: (values, dispatch, props) => {
        const updatedShift = ScheduleShiftForm.parseShiftFormValues(values);
        dispatch(editShift(updatedShift));
    }
};

export interface ScheduleShiftEditFormProps extends ScheduleShiftFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftEditFormProps) => {
    const initialShift = getShift(props.id)(state);
    if (initialShift) {
        return {
            initialValues: ScheduleShiftForm.shiftToFormValues(initialShift),    
            isSingleShift: true,
            shiftTitle: moment(initialShift.startDateTime).format('dddd MMMM DD, YYYY'),
            minTime: TimeUtils.getDefaultTimePickerMinTime(moment(initialShift.startDateTime)).toISOString(),
            maxTime: TimeUtils.getDefaultTimePickerMaxTime(moment(initialShift.endDateTime)).toISOString(),
            workSectionId: initialShift.workSectionId
        };
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class SchedyleShiftEditForm extends 
    connect<any, {}, ScheduleShiftEditFormProps>(mapStateToProps)(reduxForm(formConfig)(ScheduleShiftForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
