import * as React from 'react';
import * as moment from 'moment';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import '../../../app/assets/styles/Glyphicons.css';
import TimeSlider from '../../../app/components/FormElements/TimeSlider';

storiesOf('Components/Form Elements')
  .add('Time Slider', () => (
    <StoryPage title="Time Slider">

      <StorySection title="Time Slider - with default start and end times">
        <div style={{ width: 750, margin: 15 }}>
          <TimeSlider
            minTime={moment().set({ 'hour': 10, 'minute': 0 }).toISOString()}
            maxTime={moment().set({ 'hour': 11, 'minute': 0 }).toISOString()}
            startTime={moment().set({ 'hour': 10, 'minute': 15 }).toISOString()}
            endTime={moment().set({ 'hour': 10, 'minute': 45 }).toISOString()}
          />
        </div>
      </StorySection>

      <StorySection title="Time Slider - without default start and end times">
        <div style={{ width: 1000, margin: 15 }}>
          <TimeSlider
            minTime={moment().set({ 'hour': 7, 'minute': 0 }).toISOString()}
            maxTime={moment().set({ 'hour': 13, 'minute': 30 }).toISOString()}
          />
        </div>
      </StorySection>

      <StorySection title="Time Slider - with 30 min increments">
        <div style={{ width: 1000, margin: 15 }}>
          <TimeSlider
            minTime={moment().set({ 'hour': 7, 'minute': 0 }).toISOString()}
            maxTime={moment().set({ 'hour': 13, 'minute': 30 }).toISOString()}
            timeIncrement={30}
          />
        </div>
      </StorySection>
    </StoryPage>
  ));