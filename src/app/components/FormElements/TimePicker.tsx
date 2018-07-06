import React from 'react';
import moment from 'moment';
import Slider from 'rc-slider';
import { TimeType } from '../../api/Api';
import 'rc-slider/assets/index.css';
import { HandleWithTooltip, createMarks } from './TimeSliderCommon';

export interface TimePickerProps {
  minTime: TimeType;
  maxTime: TimeType;
  selectedTime?: TimeType;
  timeIncrement?: number;
  onTimeChanged?: (selectedTime: TimeType) => void;
  color?: string;
}
export default class TimePicker extends React.Component<TimePickerProps> {

  private handleAfterChange(selectedMinutes: any) {
    const { minTime, onTimeChanged } = this.props;
    if (onTimeChanged) {
      const newTime = moment(minTime).add('minutes', selectedMinutes).format();
      onTimeChanged(newTime);
    }
  }

  componentWillMount() {
    const {
      minTime: _minTime,
      selectedTime: _selectedTime,
      onTimeChanged
    } = this.props;
    const minTime = moment(_minTime);
    const selectedTime = _selectedTime ? moment(_selectedTime) : minTime;

    // Here we need to issue onTimeChange events if the min times
    // are larger or smaller than the current time
    if (selectedTime) {
      const adjustedSelectedTime = minTime.isAfter(selectedTime) ? minTime : selectedTime;
      if (adjustedSelectedTime !== selectedTime) {
        if (onTimeChanged) {
          onTimeChanged(adjustedSelectedTime.format());
        }
      }
    }

  }

  render() {
    const {
      minTime: _minTime,
      maxTime: _maxTime,
      timeIncrement = 15,
      selectedTime: _selectedTime,
      color = '#003366'
    } = this.props;
    const minTime = moment(_minTime);
    const maxTime = moment(_maxTime);
    const selectedTime = _selectedTime ? moment(_selectedTime) : minTime;

    const durationMinutes: number = moment.duration(maxTime.diff(minTime)).asMinutes();
    const defaultSelectedMin = selectedTime ? moment.duration(selectedTime.diff(minTime)).asMinutes() : 0;

    const markLabels = createMarks(moment(minTime), moment(maxTime), timeIncrement);

    return (
      <div
        style={{
          marginLeft: 5,
          marginRight: 15,
          marginBottom: 25,
          marginTop: 15
        }}
      >
        <Slider
          step={timeIncrement}
          dots={true}
          defaultValue={defaultSelectedMin}
          min={0}
          max={durationMinutes}
          marks={markLabels}
          dotStyle={{ borderColor: '#9bc2e4' }}
          activeDotStyle={{ borderColor: '#9bc2e4' }}
          railStyle={{ backgroundColor: '#9bc2e4' }}
          handleStyle={{ borderColor: color, backgroundColor: color }}
          trackStyle={{ backgroundColor: 'transparent' }}
          onAfterChange={(e) => this.handleAfterChange(e)}
          handle={(p: any) =>
            <HandleWithTooltip
              overlayFormatter={(v) => moment(minTime).add('minutes', v).format('HH:mm')}
              overlayStyle={{zIndex: 1200}}
              {...p}
            />
          }
        />
        
      </div>
    );
  }
}
