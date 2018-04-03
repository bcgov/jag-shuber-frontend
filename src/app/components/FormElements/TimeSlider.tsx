import * as React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface TimeSliderProps {
  // time increment => step and pushable
  // time duration => when/4 will give us the number of steps, will also give our min and max values
  durationMinutes?: number;
  timeIncrement?: number;
}

export default class TimeSlider extends React.Component<TimeSliderProps> {
  render() {
    const {durationMinutes = 60, timeIncrement = 15} = this.props;
    // const maxValue = 
    return (
      <div>
        <Range 
          step={timeIncrement} // 15 min icrement
          dots={true}
          allowCross={false}
          pushable={timeIncrement}
          defaultValue={[0, durationMinutes]} // would be the min and max
          // value={[2, 3]}
          min={0}
          max={durationMinutes}
        />
      </div>
    );
  }
}
