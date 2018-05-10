import * as React from 'react';
// import * as moment from 'moment';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import { 
    default as ScheduleControlPanelForm, 
    ScheduleControlPanelFormProps 
} from '../components/ScheduleControlPanelForm';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { getShift } from '../modules/shifts/selectors';
// import { editShift } from '../modules/shifts/actions';
// import { 
//     IdType
// } from '../api';
// import * as TimeUtils from '../infrastructure/TimeRangeUtils';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, ScheduleControlPanelFormProps> = {
    form: 'EditMultipleShift',
    onSubmit: (values, dispatch, props) => {
        const updatedShift = {...values};
        console.log(updatedShift);
        //dispatch(editShift(updatedShift));
    }
};

export interface ScheduleShiftMultiEditFormProps extends ScheduleControlPanelFormProps {
    // id: IdType;
}

const mapStateToProps = (state: RootState, props: ScheduleShiftMultiEditFormProps) => {
    // const initialShift = getShift(props.id)(state);
    // if (initialShift) {
    //     return {
    //         initialValues: ScheduleShiftForm.shiftToFormValues(initialShift),    
    //         isSingleShift: true,
    //         shiftTitle: moment(initialShift.startDateTime).format('dddd MMMM DD, YYYY'),
    //         minTime: TimeUtils.getDefaultTimePickerMinTime(moment(initialShift.startDateTime)).toISOString(),
    //         maxTime: TimeUtils.getDefaultTimePickerMaxTime(moment(initialShift.endDateTime)).toISOString(),
    //         workSectionId: initialShift.workSectionId
    //     };
    // } else {
    //     return {};
    // }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class ScheduleShiftMultiEditForm extends 
    connect<any, {}, ScheduleShiftMultiEditFormProps>(mapStateToProps)(reduxForm(formConfig)(ScheduleControlPanelForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}
