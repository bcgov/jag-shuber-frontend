import * as React from 'react';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import '../../../app/assets/styles/Glyphicons.css';
import AssignmentDutySplitter from '../../../app/components/AssignmentDutySplitter';

storiesOf('Timeline')
  .add('Duty Splitter', () => (
    <StoryPage title="Duty Splitter">

      <StorySection title="Duty Splitter with default start and end times">
        <div style={{ width: 750, margin: 15 }}>
          <AssignmentDutySplitter />
        </div>
      </StorySection>

    </StoryPage>
  ));