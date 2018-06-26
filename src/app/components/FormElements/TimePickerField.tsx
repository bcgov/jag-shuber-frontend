import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
import TimePicker from './TimePicker';
import * as TimeUtils from '../../infrastructure/TimeRangeUtils';

interface TimePickerFieldProps {
    nullTimeLabel?: string;
}

export default class TimePickerField extends 
    React.PureComponent<FormFieldWrapperProps & TimePickerFieldProps> {
    
    render() {
        const {
            input: { value, onFocus, onChange, onBlur },
            meta: { active },
            label,
            nullTimeLabel = 'missing time'
        } = this.props;
        const selectedTimeDisplay = value ? moment(value).format('HH:mm') : nullTimeLabel;
        const minTime = TimeUtils.getDefaultTimePickerMinTime(moment(value)).toISOString();
        const maxTime = TimeUtils.getDefaultTimePickerMaxTime(moment(value)).toISOString();

        return (
            <FormFieldWrapper {...this.props} showLabel={false}>
                <FormControl
                    readOnly={true}
                    type="text"
                    placeholder={`Enter ${label}`}
                    value={selectedTimeDisplay}
                    onFocus={onFocus}
                    onBlur={e => onBlur(undefined)}
                    style={{maxWidth: 60}}
                />
                {active && (
                    <div
                        className="drop-shadow"
                        style={{
                            background: 'white',
                            position: 'absolute',
                            width: '80%',
                            zIndex: 100,
                            height: 110,
                            paddingTop: 15,
                            paddingBottom: 15,
                            paddingLeft: 15,
                            paddingRight: 20,
                            left: '10%',
                            borderRadius: 8,
                            marginTop: 4
                        }}
                    >
                        <span style={{fontWeight: 'bold'}}>{label}</span>
                        <TimePicker
                            minTime={minTime}
                            maxTime={maxTime}
                            selectedTime={value}
                            timeIncrement={15}
                            onTimeChanged={onChange}
                        />
                    </div>
                )}
            </FormFieldWrapper>
        );
    }
}