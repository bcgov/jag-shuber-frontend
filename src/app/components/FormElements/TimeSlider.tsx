import * as React from 'react';
import * as moment from 'moment';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface TimeSliderProps {
  sliderStartTime: moment.Moment;
  sliderEndTime: moment.Moment;
  defaultStartTime?: moment.Moment;
  defaultEndTime?: moment.Moment;
  timeIncrement?: number;
}

export default class TimeSlider extends React.Component<TimeSliderProps> {
  render() {
    const {
      sliderStartTime,
      sliderEndTime,
      timeIncrement = 15,
      defaultStartTime,
      defaultEndTime
    } = this.props;
    const durationMinutes: number = moment.duration(sliderEndTime.diff(sliderStartTime)).asMinutes();
    const numberOfMarks: number = durationMinutes / timeIncrement;
    const defaultStartMin = defaultStartTime ? moment.duration(defaultStartTime.diff(sliderStartTime)).asMinutes() : 0;
    const defaultEndMin =
      defaultEndTime ? moment.duration(defaultEndTime.diff(sliderStartTime)).asMinutes() : durationMinutes;

    let markLabels = {};
    for (let i = 0; i <= numberOfMarks; i++) {
      const index = i * timeIncrement;
      const minuteValue = i * timeIncrement;
      let timeLabel = moment(sliderStartTime).add('minutes', minuteValue);
      markLabels[index] = timeLabel.format('HH:mm');
    }

    return (
      <div>
        <Range
          step={timeIncrement}
          dots={true}
          allowCross={false}
          defaultValue={[defaultStartMin, defaultEndMin]}
          min={0}
          max={durationMinutes}
          marks={markLabels}
          trackStyle={[{ backgroundColor: '#003366' }]}
          railStyle={{ backgroundColor: '#bcbec5' }}
          dotStyle={{ borderColor: '#bcbec5' }}
          activeDotStyle={{ borderColor: '#003366' }} 
          handleStyle={
            [
              { borderColor: '#FCBA19' }, 
              { borderColor: '#FCBA19' }
            ]} 
        />
      </div>
    );
  }
}
