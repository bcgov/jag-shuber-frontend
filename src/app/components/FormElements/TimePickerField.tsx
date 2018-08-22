import React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimePicker from './TimePicker';
import { TimeType } from '../../api/Api';

export interface TimePickerFieldProps {
    minTime: TimeType;
    maxTime: TimeType;
    timeIncrement: number;
    color: string;
    minAllowedTime?: TimeType;
    maxAllowedTime?: TimeType;
}
export default class TimePickerField extends React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {

    render() {
        const {
            input: { onChange, value },
            minTime,
            maxTime,
            timeIncrement,
            color,
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