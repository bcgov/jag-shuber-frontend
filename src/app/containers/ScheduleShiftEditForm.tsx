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
import { getSheriff } from '../modules/sheriffs/selectors';
import { 
    IdType, 
    Shift 
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleShiftFormProps> = {
    form: 'EditShift',
    onSubmit: (values, dispatch, props) => {
        const { isSheriffAssigned, sheriffId, ...shiftValues } = values;
        let updatedShift: Partial<Shift> =  {
            ...shiftValues, 
            sheriffId: isSheriffAssigned ? sheriffId : undefined
        };
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
            initialValues: {
                ...initialShift, 
                isSheriffAssigned: true,
            },       
            isSingleShift: true,
            shiftTitle: moment(initialShift.startDateTime).format('dddd MMMM DD, YYYY'),
            assignedSheriff: getSheriff(initialShift.sheriffId)(state),
            
        };
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class AssignmentEditForm extends 
    connect<any, {}, ScheduleShiftEditFormProps>(mapStateToProps)(reduxForm(formConfig)(ScheduleShiftForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
