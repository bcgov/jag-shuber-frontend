import React from 'react';
import moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl, DropdownButton } from 'react-bootstrap';
import TimePicker from './TimePicker';
import * as TimeUtils from '../../infrastructure/TimeRangeUtils';

interface TimePickerFieldProps {
    nullTimeLabel?: string;
}

export default class TimePickerField extends
    React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {

    render() {
        const {
            // input: { value, onFocus, onChange, onBlur },
            input: { value, onChange },
            // meta: { active },
            label,
            nullTimeLabel = 'missing time'
        } = this.props;
        const selectedTimeDisplay = value ? moment(value).format('HH:mm') : nullTimeLabel;
        const minTime = TimeUtils.getDefaultTimePickerMinTime(moment(value)).toISOString();
        const maxTime = TimeUtils.getDefaultTimePickerMaxTime(moment(value)).toISOString();

        return (
            <FormFieldWrapper {...this.props} showLabel={false}>
                <FormControl
                    placeholder={`Enter ${label}`}
                    value={selectedTimeDisplay}
                    style={{ maxWidth: 60 }}
                    type="hidden"
                />
                <DropdownButton
                    title={selectedTimeDisplay}
                    noCaret={true}
                    id="time-picker-drop-down"
                >
                    <div style={{ width: 800, padding: 15 }}>
                        <span style={{fontWeight: 'bold'}}>{label}</span>
                        <TimePicker
                            minTime={minTime}
                            maxTime={maxTime}
                            selectedTime={value}
                            timeIncrement={15}
                            onTimeChanged={onChange}
                        />
                    </div>
                </DropdownButton>
            </FormFieldWrapper>
        );
    }
}