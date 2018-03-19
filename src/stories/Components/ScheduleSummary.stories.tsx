import * as React from 'react';
import { storiesOf } from '../utils';
import StoryPage from '../StoryUI/StoryPage';
import StorySection from '../StoryUI/StorySection';
import {
  default as ScheduleSummary,
  StatusEnum
} from '../../app/components/ScheduleSummary/ScheduleSummary';
import '../../app/assets/styles/Glyphicons.css';

storiesOf('Components')
  .add('Schedule Summary', () => (
    <StoryPage title="Schedule Summary">

      <StorySection title="Fully Schedulued">
        <ScheduleSummary
          weekStatus={{
            sunday: StatusEnum.HIDDEN,
            monday: StatusEnum.GOOD,
            tuesday: StatusEnum.GOOD,
            wednesday: StatusEnum.GOOD,
            thursday: StatusEnum.GOOD,
            friday: StatusEnum.GOOD,
            saturday: StatusEnum.HIDDEN
          }}
        />
      </StorySection>

      <StorySection title="Fully Available">
        <ScheduleSummary
          weekStatus={{
            sunday: StatusEnum.HIDDEN,
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.EMPTY,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.EMPTY,
            friday: StatusEnum.EMPTY,
            saturday: StatusEnum.HIDDEN
          }}
        />
      </StorySection>

      <StorySection title="Available with Warnings">
        <ScheduleSummary
          weekStatus={{
            sunday: StatusEnum.HIDDEN,
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.EMPTY,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.WARNING,
            friday: StatusEnum.EMPTY,
            saturday: StatusEnum.HIDDEN
          }}
        />
      </StorySection>

      <StorySection title="Available with Days Off">
        <ScheduleSummary
          weekStatus={{
            sunday: StatusEnum.HIDDEN,
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.EMPTY,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.BAD,
            friday: StatusEnum.BAD,
            saturday: StatusEnum.HIDDEN
          }}
        />
      </StorySection>
      
      <StorySection title="Fully Schedulued - Weekends Included">
        <ScheduleSummary
          weekStatus={{
            sunday: StatusEnum.EMPTY,
            monday: StatusEnum.GOOD,
            tuesday: StatusEnum.GOOD,
            wednesday: StatusEnum.GOOD,
            thursday: StatusEnum.GOOD,
            friday: StatusEnum.GOOD,
            saturday: StatusEnum.EMPTY
          }}
        />
      </StorySection>

    </StoryPage>
  ));
