import * as React from 'react';
import * as moment from 'moment';
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
          <AssignmentDutySplitter 
            sheriffDuties={
              [
                {
                  id: '1',
                  sheriffId: '1',
                  dutyId: '1', 
                  startDateTime: moment().set({ 'hour': 10, 'minute': 15 }).toISOString(),
                  endDateTime: moment().set({ 'hour': 10, 'minute': 45 }).toISOString(),
                },
                {
                  id: '2',
                  sheriffId: '2',
                  dutyId: '1', 
                  startDateTime: moment().set({ 'hour': 10, 'minute': 0 }).toISOString(),
                  endDateTime: moment().set({ 'hour': 10, 'minute': 30 }).toISOString(),
                }
              ]
            }
            dutyStartTime={moment().set({ 'hour': 10, 'minute': 0 }).toISOString()}
            dutyEndTime={moment().set({ 'hour': 11, 'minute': 0 }).toISOString()}
          />
        </div>
      </StorySection>
    </StoryPage>
  ));