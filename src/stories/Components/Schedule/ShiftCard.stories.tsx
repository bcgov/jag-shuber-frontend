import * as React from 'react';
import * as moment from 'moment';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import ShiftCard from '../../../app/components/ShiftCard'; 
import '../../../app/assets/styles/Glyphicons.css';

storiesOf('Components/Schedule')
  .add('Shift Card', () => (
    <StoryPage title="Shift Card">

      <StorySection title="Shift with Sheriff">
        <ShiftCard
          shift={{
            id: '501', 
            locationId: '1',
            workSectionId: 'COURTS', 
            sheriffId: '3',
            startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(6, 'hours'),
            endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(13.5, 'hours')
          }}
        />
      </StorySection>

      <StorySection title="Shift without Sheriff">
        <ShiftCard
          shift={{
            id: '501', 
            locationId: '1',
            workSectionId: 'COURTS', 
            startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(6, 'hours'),
            endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(13.5, 'hours')
          }}
        />
      </StorySection>

    </StoryPage>
  ));