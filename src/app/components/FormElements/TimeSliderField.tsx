import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimeSlider from './TimeSlider';
import { TimeType } from '../../api/Api';

export interface TimeSliderFieldProps {
    minTime: TimeType; 
    maxTime: TimeType; 
    timeIncrement: number; 
    color: string; 
    minAllowedTime?: TimeType; 
    maxAllowedTime?: TimeType;
}
export default class TimeSliderField extends React.PureComponent<FormFieldWrapperProps & TimeSliderFieldProps> {

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
        const { startTime, endTime} = value;
        return (
            <FormFieldWrapper {...this.props}>
                <TimeSlider
                    minTime={minTime}
                    maxTime={maxTime}
                    startTime={startTime}
                    endTime={endTime}
                    timeIncrement={timeIncrement}
                    onTimeChanged={onChange}
                    color={color}
                    minAllowedTime={minAllowedTime}
                    maxAllowedTime={maxAllowedTime}
                />
            </FormFieldWrapper>
        );
    }
}