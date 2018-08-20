import React from 'react';
import moment from 'moment';
import Slider from 'rc-slider';
import { TimeType } from '../../api/Api';
import {
  HandleWithTooltip,
  createMarks,
  sliderWithLimits
} from './TimeSliderCommon';
import 'rc-slider/assets/index.css';

export interface TimePickerProps {
  minTime: TimeType;
  maxTime: TimeType;
  minAllowedTime?: TimeType;
  maxAllowedTime?: TimeType;
  selectedTime?: TimeType;
  timeIncrement?: number;
  onTimeChanged?: (selectedTime: TimeType) => void;
  handleColor?: string;
  railColor?: string;
}

class TimePicker extends React.Component<TimePickerProps> {

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
      handleColor = '#003366',
      railColor = '#9bc2e4'
    } = this.props;
    const minTime = moment(_minTime);
    const maxTime = moment(_maxTime);

    const selectedTime = _selectedTime ? moment(_selectedTime) : minTime;
    const durationMinutes: number = moment.duration(maxTime.diff(minTime)).asMinutes();
    const defaultSelectedMin = selectedTime ? moment.duration(selectedTime.diff(minTime)).asMinutes() : 0;

    const markLabels = createMarks(moment(minTime), moment(maxTime), timeIncrement);

    return (
      <Slider
        {...this.props}
        step={timeIncrement}
        dots={true}
        defaultValue={defaultSelectedMin}
        min={0}
        max={durationMinutes}
        marks={markLabels}
        dotStyle={{ borderColor: railColor }}
        activeDotStyle={{ borderColor: railColor }}
        railStyle={{ backgroundColor: railColor }}
        handleStyle={{ borderColor: handleColor, backgroundColor: handleColor }}
        trackStyle={{ backgroundColor: railColor }}
        onAfterChange={(e) => this.handleAfterChange(e)}
        handle={(p: any) =>
          <HandleWithTooltip
            overlayFormatter={(v) => moment(minTime).add('minutes', v).format('HH:mm')}
            overlayStyle={{ zIndex: 1200 }}
            {...p}
          />
        }
      />
    );
  }
}

export default sliderWithLimits(TimePicker);