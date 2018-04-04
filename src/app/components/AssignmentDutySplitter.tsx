import * as React from 'react';
import * as moment from 'moment';
import TimeSlider from './FormElements/TimeSlider';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

export interface DutySplitterProps {
}

export default class DutySplitter extends React.Component<DutySplitterProps> {
  render() {
    return (
      <div>
           <h4>Doe, J</h4>
          <TimeSlider
            sliderStartTime={moment().set({ 'hour': 10, 'minute': 0 })}
            sliderEndTime={moment().set({ 'hour': 11, 'minute': 0 })}
            defaultStartTime={moment().set({ 'hour': 10, 'minute': 0 })}
            defaultEndTime={moment().set({ 'hour': 10, 'minute': 30 })}
          />
          <br /><br />
          <h4>Smith, S</h4>
          <TimeSlider
            sliderStartTime={moment().set({ 'hour': 10, 'minute': 0 })}
            sliderEndTime={moment().set({ 'hour': 11, 'minute': 0 })}
            defaultStartTime={moment().set({ 'hour': 10, 'minute': 30 })}
            defaultEndTime={moment().set({ 'hour': 11, 'minute': 0 })}
          />
          <br /> <br/>
          <Button>
            <Glyphicon glyph="plus" />
          </Button>
      </div>
    );
  }
}
