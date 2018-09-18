import React from 'react';
import {
    reduxForm,
    ConfigProps,
    submit
} from 'redux-form';
import {
    default as ScheduleMultiShiftForm,
    ScheduleMultiShiftFormProps
} from '../components/ScheduleMultiShiftForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    selectedShiftIds,
    anySelectedShiftsOnSameDay,
    selectedShifts,
    selectedShiftsAssignedSheriffs,
    selectedShiftsEndTimes,
    selectedShiftsStartTimes,
    selectedShiftsWorkSectionId,
    selectedShiftsAnticipatedAssignment
} from '../modules/schedule/selectors';
import { editMultipleShifts } from '../modules/shifts/actions';
import { toTimeString } from 'jag-shuber-api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleMultiShiftFormProps> = {
    form: 'EditMultipleShift',
    onSubmit: (values, dispatch, props) => {

        const updateDetails = ScheduleMultiShiftForm.parseUpdateDetailsFromValues(values);
        if (toTimeString(updateDetails.endTime) === toTimeString(props.initialValues.endTime)) {
            delete updateDetails.endTime;
        }

        if (toTimeString(updateDetails.startTime) === toTimeString(props.initialValues.startTime)) {
            delete updateDetails.startTime;
        }

        if (props.selectedShiftIds) {
            dispatch(editMultipleShifts({
                shiftIds: props.selectedShiftIds,
                updateDetails
            }));
        }
    },
    enableReinitialize: true
};

export interface ScheduleShiftMultiEditFormProps extends ScheduleMultiShiftFormProps {
}

const mapStateToProps = (state: RootState, props: ScheduleShiftMultiEditFormProps) => {
    const initialSelectedShiftIds = selectedShiftIds(state);
    const selectedShiftsList = selectedShifts(state);
    if (selectedShiftsList.length > 0) {
        if (selectedShiftsList) {
            return {
                initialValues: {
                    workSectionId: selectedShiftsWorkSectionId()(state),
                    sheriffId: selectedShiftsAssignedSheriffs()(state),
                    startTime: selectedShiftsStartTimes()(state),
                    endTime: selectedShiftsEndTimes()(state),
                    assignmentId: selectedShiftsAnticipatedAssignment()(state)
                },
                selectedShiftIds: initialSelectedShiftIds,
                canAssignSheriff: anySelectedShiftsOnSameDay(state)
            };
        } else {
            return {};
        }
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class ScheduleShiftMultiEditForm extends
    connect<any, {}, ScheduleShiftMultiEditFormProps>(mapStateToProps)(reduxForm(formConfig)(ScheduleMultiShiftForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) =>
        <FormSubmitButton {...props} formName={formConfig.form} />

    static submitAction() {
        return submit(formConfig.form);
    }
}
