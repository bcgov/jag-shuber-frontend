import * as React from 'react';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import ScheduleDeputyViewList from '../../../app/components/ScheduleDeputyViewList';
import { 
  sheriffShifts, 
  sheriffList
} from '../../../app/api/Mock/MockData';

storiesOf('Components/Schedule')
  .add('Schedule Deputy View', () => (
    <StoryPage title="Deputy View of Schedule">

      <StorySection title="Deputy Schedule - No Work Section">
        <ScheduleDeputyViewList 
          sheriffs={sheriffList}
          shifts={sheriffShifts}
          includeWorkSection={false}        
        />
      </StorySection>

      <StorySection title="Deputy Schedule - No Work Section">
        <ScheduleDeputyViewList 
          sheriffs={sheriffList}
          shifts={sheriffShifts}
          includeWorkSection={true}        
        />
      </StorySection>

    </StoryPage>
  ));
