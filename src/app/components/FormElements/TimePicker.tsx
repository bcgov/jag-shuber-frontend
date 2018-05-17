import * as React from 'react';
import * as moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TimeType } from '../../api/Api';

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
      const newTime = moment(minTime).add('minutes', selectedMinutes).toISOString();
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
          onTimeChanged(adjustedSelectedTime.toISOString());
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
    const numberOfMarks: number = durationMinutes / timeIncrement;
    const defaultSelectedMin = selectedTime ? moment.duration(selectedTime.diff(minTime)).asMinutes() : 0;

    let markLabels = {};
    for (let i = 0; i <= numberOfMarks; i++) {
      const index = i * timeIncrement;
      const minuteValue = i * timeIncrement;
      let timeLabel = moment(minTime).add('minutes', minuteValue);
      if (timeLabel.get('minutes') === 0) {
        markLabels[index] = timeLabel.format('HH:mm');
      } else {
        markLabels[index] = '';
      }
    }

    return (
      <div style={{ margin: 5 }}>
        <Slider
          step={timeIncrement}
          dots={true}
          defaultValue={defaultSelectedMin}
          min={0}
          max={durationMinutes}
          marks={markLabels}
          dotStyle={{borderColor: '#9bc2e4'}}
          activeDotStyle={{ borderColor: '#9bc2e4' }}
          railStyle={{backgroundColor: '#9bc2e4'}}
          handleStyle={{ borderColor: color, backgroundColor: color }}
          trackStyle={{ backgroundColor: 'transparent'}}
          onAfterChange={(e) => this.handleAfterChange(e)}
        />
      </div>
    );
  }
}
