import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimeSlider from './TimeSlider';
import { TimeType } from '../../api/Api';

export default class TimeSliderField extends React.PureComponent<FormFieldWrapperProps
    & { minTime: TimeType, maxTime: TimeType, timeIncrement: number}> {

    render() {
        const { input: { onChange, value }, minTime, maxTime, timeIncrement } = this.props;
        const { startTime, endTime } = value;
        return (
            <FormFieldWrapper {...this.props}>
                <TimeSlider
                    minTime={minTime}
                    maxTime={maxTime}
                    startTime={startTime}
                    endTime={endTime}
                    timeIncrement={timeIncrement}
                    onTimeChanged={onChange}
                />
            </FormFieldWrapper>
        );
    }
}