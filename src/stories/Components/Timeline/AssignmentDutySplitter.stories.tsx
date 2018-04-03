import * as React from 'react';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import '../../../app/assets/styles/Glyphicons.css';
import TimeSlider from '../../../app/components/FormElements/TimeSlider';

storiesOf('Timeline')
  .add('Duty Splitter', () => (
    <StoryPage title="Duty Splitter">

      <StorySection title="Duty Splitter">
        <TimeSlider
          
        />
      </StorySection>

    </StoryPage>
  ));