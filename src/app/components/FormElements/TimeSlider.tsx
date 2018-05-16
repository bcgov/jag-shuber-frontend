import * as React from 'react';
import * as moment from 'moment';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TimeType } from '../../api/Api';

export interface TimeSliderProps {
  minTime: TimeType;
  maxTime: TimeType;
  startTime?: TimeType;
  endTime?: TimeType;
  timeIncrement?: number;
  onTimeChanged?: (newTimes: { startTime: TimeType, endTime: TimeType }) => void;
  color?: string;
}

export default class TimeSlider extends React.Component<TimeSliderProps> {

  private handleAfterChange(arg: number[]) {
    const { minTime, onTimeChanged } = this.props;
    if (onTimeChanged) {
      const newTimes = {
        startTime: moment(minTime).add('minutes', arg[0]).toISOString(),
        endTime: moment(minTime).add('minutes', arg[1]).toISOString()
      };
      onTimeChanged(newTimes);
    }
  }

  componentWillMount() {
    const {
      minTime: _minTime,
      maxTime: _maxTime,
      startTime: _startTime,
      endTime: _endTime,
      onTimeChanged
    } = this.props;
    const minTime = moment(_minTime);
    const maxTime = moment(_maxTime);
    const startTime = _startTime ? moment(_startTime) : minTime;
    const endTime = _endTime ? moment(_endTime) : maxTime;

    // Here we need to issue onTimeChange events if the min/max times
    // are larger or smaller than the current start/end
    if (startTime && endTime) {
      const adjustedStartTime = minTime.isAfter(startTime) ? minTime : startTime;
      const adjustedEndTime = maxTime.isBefore(endTime) ? maxTime : endTime;
      if (adjustedStartTime !== startTime || adjustedEndTime !== endTime) {
        if (onTimeChanged) {
          onTimeChanged({
            startTime: adjustedStartTime.toISOString(),
            endTime: adjustedEndTime.toISOString()
          });
        }
      }
    }

  }

  render() {
    const {
      minTime: _minTime,
      maxTime: _maxTime,
      timeIncrement = 15,
      startTime: _startTime,
      endTime: _endTime,
      color = '#003366'
    } = this.props;
    const minTime = moment(_minTime);
    const maxTime = moment(_maxTime);
    const startTime = _startTime ? moment(_startTime) : minTime;
    const endTime = _endTime ? moment(_endTime) : maxTime;

    const durationMinutes: number = moment.duration(maxTime.diff(minTime)).asMinutes();
    const numberOfMarks: number = durationMinutes / timeIncrement;
    const defaultStartMin = startTime ? moment.duration(startTime.diff(minTime)).asMinutes() : 0;
    const defaultEndMin =
      endTime ? moment.duration(endTime.diff(minTime)).asMinutes() : durationMinutes;

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
        <Range
          step={timeIncrement}
          dots={true}
          allowCross={false}
          defaultValue={[defaultStartMin, defaultEndMin]}
          min={0}
          max={durationMinutes}
          marks={markLabels}
          trackStyle={[{ backgroundColor: color }]}
          activeDotStyle={{ borderColor: color }}
          handleStyle={
            [
              { borderColor: color, backgroundColor: color },
              { borderColor: color, backgroundColor: color }
            ]}
          onAfterChange={(e) => this.handleAfterChange(e)}
        />
      </div>
    );
  }
}
