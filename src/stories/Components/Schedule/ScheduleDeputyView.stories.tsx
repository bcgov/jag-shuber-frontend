import * as React from 'react';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import ScheduleDeputyViewList from '../../../app/components/ScheduleDeputyViewList';

storiesOf('Components/Schedule')
  .add('Schedule Deputy View', () => (
    <StoryPage title="Deputy View of Schedule">

      <StorySection title="Deputy Schedule - No Work Section">
        <ScheduleDeputyViewList 
          weekDayLabels={[
            'Monday, April 16',
            'Tuesday, April 17',
            'Wednesday, April 18',
            'Thursday, April 19',
            'Friday, April 20'
          ]}
          sheriffShifts={[
            {
              sheriffName: 'Baird, Lisa',
              details: [
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                }
              ]
            },
            {
              sheriffName: 'Doe, John',
              details: [
                {
                  time: '08:30-16:30',
                  workSectionId: 'ESCORTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'ESCORTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'OTHER'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'OTHER'
                }
              ]
            },
            {
              sheriffName: 'Smith, Jane',
              details: [
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                }
              ]
            }
          ]}
          includeWorkSection={false}        
        />
      </StorySection>

      <StorySection title="Deputy Schedule - Work Section">
        <ScheduleDeputyViewList 
          weekDayLabels={[
            'Monday, April 16',
            'Tuesday, April 17',
            'Wednesday, April 18',
            'Thursday, April 19',
            'Friday, April 20'
          ]}
          sheriffShifts={[
            {
              sheriffName: 'Baird, Lisa',
              details: [
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'JAIL'
                }
              ]
            },
            {
              sheriffName: 'Doe, John',
              details: [
                {
                  time: '08:30-16:30',
                  workSectionId: 'ESCORTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'COURTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'ESCORTS'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'OTHER'
                },
                {
                  time: '08:30-16:30',
                  workSectionId: 'OTHER'
                }
              ]
            },
            {
              sheriffName: 'Smith, Jane',
              details: [
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                },
                {
                  time: '08:30-16:30'
                }
              ]
            }
          ]}
          includeWorkSection={true}        
        />
      </StorySection>

    </StoryPage>
  ));
