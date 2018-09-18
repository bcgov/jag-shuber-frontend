import React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimePicker from './TimePicker';
import { TimeType } from '../../api/Api';
import { getDefaultTimePickerMinTime, getDefaultTimePickerMaxTime } from '../../infrastructure/TimeRangeUtils';

export interface TimePickerFieldProps {
    minTime?: TimeType;
    maxTime?: TimeType;
    timeIncrement?: number;
    color?: string;
    minAllowedTime?: TimeType;
    maxAllowedTime?: TimeType;
}
export default class TimePickerField extends React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {

    render() {
        const {
            input: { onChange, value },
            minTime = getDefaultTimePickerMinTime().format(),
            maxTime = getDefaultTimePickerMaxTime().format(),
            timeIncrement = 15,
            color = 'black',
            minAllowedTime,
            maxAllowedTime
        } = this.props;

        return (
            <FormFieldWrapper {...this.props}>
                <TimePicker
                    minTime={minTime}
                    maxTime={maxTime}
                    selectedTime={value}
                    timeIncrement={timeIncrement}
                    onTimeChanged={onChange}
                    handleColor={color}
                    railColor={color}
                    minAllowedTime={minAllowedTime}
                    maxAllowedTime={maxAllowedTime}
                />
            </FormFieldWrapper>
        );
    }
}