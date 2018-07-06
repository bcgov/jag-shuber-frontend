import React from 'react';
import Measure from 'react-measure';
import moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl, Dropdown } from 'react-bootstrap';
import * as TimeUtils from '../../infrastructure/TimeRangeUtils';
import TimePicker from './TimePicker';

interface TimePickerFieldProps {
    nullTimeLabel?: string;
    timeIncrement?: number;
    style?: React.CSSProperties;
}

export default class TimePickerField extends
    React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {

    render() {
        const {
            input: { value, onChange },
            label,
            nullTimeLabel = 'missing time',
            timeIncrement = 15,
            style = {}
        } = this.props;
        const selectedTimeDisplay = value ? moment(value).format('HH:mm') : nullTimeLabel;
        const minTime = TimeUtils.getDefaultTimePickerMinTime(moment(value)).toISOString();
        const maxTime = TimeUtils.getDefaultTimePickerMaxTime(moment(value)).toISOString();

        return (
            <FormFieldWrapper {...this.props} showLabel={false}>
                <FormControl
                    placeholder={`Enter ${label}`}
                    value={selectedTimeDisplay}
                    style={{ display: 'none' }}
                    type="input"
                />
                <Measure
                    bounds={true}
                    offset={false}
                    client={false}
                >
                    {({ measureRef, contentRect }) => (
                        <div ref={measureRef}>
                            <Dropdown
                                id="time-picker-drop-down"
                            >
                                <Dropdown.Toggle noCaret={true} bsClass="timepicker-field dropdown">
                                    {selectedTimeDisplay}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    style={{
                                        width: '80vw',
                                        left: `calc(10vw - ${contentRect.bounds ? contentRect.bounds.left : 0}px)`
                                    }}>
                                    <div style={{ padding: 15, ...style }} >
                                        <span style={{ fontWeight: 'bold' }}>{label}</span>
                                        <TimePicker
                                            minTime={minTime}
                                            maxTime={maxTime}
                                            selectedTime={value}
                                            timeIncrement={timeIncrement}
                                            onTimeChanged={onChange}
                                        />
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Measure>
            </FormFieldWrapper>
        );
    }
}