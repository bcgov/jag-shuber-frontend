import * as React from 'react';
import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps,
    submit
} from 'redux-form';
import {
    default as ScheduleControlPanelForm,
    ScheduleControlPanelFormProps
} from '../components/ScheduleControlPanelForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    // visibleTime,
    selectedShifts
} from '../modules/schedule/selectors';
import { getShift } from '../modules/shifts/selectors';
import { Shift } from '../api/Api';
// import { editShift } from '../modules/shifts/actions';
// import { 
//     IdType
// } from '../api';
// import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleControlPanelFormProps> = {
    form: 'EditMultipleShift',
    onSubmit: (values, dispatch, props) => {
        const updatedShift = { ...values };
        console.log(updatedShift);
        //dispatch(editShift(updatedShift));
    },
    enableReinitialize: true
};

export interface ScheduleShiftMultiEditFormProps extends ScheduleControlPanelFormProps {
    // id: IdType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftMultiEditFormProps) => {
    const initialSelectedShiftIds = selectedShifts(state);
    if (initialSelectedShiftIds.length > 0) {
        const selectedShiftsList = initialSelectedShiftIds.map((value) => getShift(value)(state));

        if (selectedShiftsList) {
            const shiftToCompare = selectedShiftsList[0] as Shift;
            const {
                workSectionId: workSectionIdToCompare,
                sheriffId: sheriffIdToCompare,
                startDateTime,
                endDateTime
            } = shiftToCompare;
            const startTimeToCompare = moment(startDateTime).format('HH:mm');
            const endTimeToCompare = moment(endDateTime).format('HH:mm');
            const doWorkSectionsMatch: boolean =
                selectedShiftsList.every(s => s.workSectionId === workSectionIdToCompare);
            const doAssignedSheriffMatch: boolean =
                selectedShiftsList.every(s => s.sheriffId === sheriffIdToCompare);
            const doStartTimesMatch: boolean =
                selectedShiftsList.every(s => moment(s.startDateTime).format('HH:mm') === startTimeToCompare);
            const doEndTimesMatch: boolean =
                selectedShiftsList.every(s => moment(s.endDateTime).format('HH:mm') === endTimeToCompare);
            const startTimeString = doStartTimesMatch ? startTimeToCompare : 'varied';
            const endTimeString = doEndTimesMatch ? endTimeToCompare : 'varied';
            return {
                initialValues: {
                    workSectionId: doWorkSectionsMatch ? shiftToCompare.workSectionId : 'varied',
                    sheriffId: doAssignedSheriffMatch ? shiftToCompare.sheriffId : 'varied',
                    time: `${startTimeString} - ${endTimeString}`
                }
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
    connect<any, {}, ScheduleShiftMultiEditFormProps>(mapStateToProps)(reduxForm(formConfig)(ScheduleControlPanelForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) =>
        <FormSubmitButton {...props} formName={formConfig.form} />

    static submitAction() {
        return submit(formConfig.form);
    }
}
