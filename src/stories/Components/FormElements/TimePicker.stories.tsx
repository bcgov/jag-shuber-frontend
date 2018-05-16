import * as React from 'react';
import * as moment from 'moment';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import '../../../app/assets/styles/Glyphicons.css';
import TimePicker from '../../../app/components/FormElements/TimePicker';

storiesOf('Components/Form Elements')
  .add('Time Picker', () => (
    <StoryPage title="Time Picker">

      <StorySection title="Time Picker - with selected time">
        <div style={{ width: 750, margin: 15 }}>
          <TimePicker
            minTime={moment().set({ 'hour': 10, 'minute': 0 }).toISOString()}
            maxTime={moment().set({ 'hour': 12, 'minute': 0 }).toISOString()}
            selectedTime={moment().set({ 'hour': 11, 'minute': 15 }).toISOString()}
          />
        </div>
      </StorySection>
      
      <StorySection title="Time Picker - without selected time">
        <div style={{ width: 750, margin: 15 }}>
          <TimePicker
            minTime={moment().set({ 'hour': 10, 'minute': 0 }).toISOString()}
            maxTime={moment().set({ 'hour': 12, 'minute': 0 }).toISOString()}
          />
        </div>
      </StorySection>
    </StoryPage>
  ));