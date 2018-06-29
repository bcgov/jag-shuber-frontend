import React from 'react';
import moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl, DropdownButton } from 'react-bootstrap';
import * as TimeUtils from '../../infrastructure/TimeRangeUtils';
import TimePicker from './TimePicker';

interface TimePickerFieldProps {
    nullTimeLabel?: string;
}

export default class TimePickerField extends
    React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {

    render() {
        const {
            input: { value, onChange },
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
                    style={{ display: 'none'  }}
                    type="input"
                />
                <DropdownButton
                    title={selectedTimeDisplay}
                    noCaret={true}
                    id="time-picker-drop-down"
                >
                    <div style={{ width: 1100, padding: 15 }}>
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