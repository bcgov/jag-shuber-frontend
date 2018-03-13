import * as React from 'react';
import { storiesOf } from '../utils';
// import { text } from '@storybook/addon-knobs';
import StoryPage from '../StoryUI/StoryPage';
import StorySection from '../StoryUI/StorySection';
import ScheduleSummary from '../../app/components/ScheduleSummary';

storiesOf('Components')
  .add('Schedule Summary', () => (
    <StoryPage title="Schedule Summary">
      <StorySection title="Default / Empty">
        <ScheduleSummary />
      </StorySection>
    </StoryPage>
  ));
