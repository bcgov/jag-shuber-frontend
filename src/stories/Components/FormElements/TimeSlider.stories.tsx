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
            sliderStartTime={moment().set({ 'hour': 10, 'minute': 0 })}
            sliderEndTime={moment().set({ 'hour': 11, 'minute': 0 })}
            defaultStartTime={moment().set({ 'hour': 10, 'minute': 15 })}
            defaultEndTime={moment().set({ 'hour': 10, 'minute': 45 })}
          />
        </div>
      </StorySection>

      <StorySection title="Time Slider - without default start and end times">
        <div style={{ width: 750, margin: 15 }}>
          <TimeSlider
            sliderStartTime={moment().set({ 'hour': 10, 'minute': 0 })}
            sliderEndTime={moment().set({ 'hour': 11, 'minute': 0 })}
          />
        </div>
      </StorySection>
    </StoryPage>
  ));