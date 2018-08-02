import React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimePicker from './TimePicker';
import { TimeType } from '../../api/Api';

export default class TimePickerField extends React.PureComponent<FormFieldWrapperProps
    & { minTime: TimeType, maxTime: TimeType, timeIncrement: number, color: string}> {

    render() {
        const { input: { onChange, value }, minTime, maxTime, timeIncrement, color } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <TimePicker
                    minTime={minTime}
                    maxTime={maxTime}
                    selectedTime={value}
                    timeIncrement={timeIncrement}
                    onTimeChanged={onChange}
                    color={color}
                />
            </FormFieldWrapper>
        );
    }
}