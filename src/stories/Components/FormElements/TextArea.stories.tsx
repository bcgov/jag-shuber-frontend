import * as React from 'react';
import { storiesOf } from '../../utils';
import { text, boolean } from '@storybook/addon-knobs';
import {
  fieldProps,
  warningFieldProps,
  errorFieldProps
} from './utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import TextArea from '../../../app/components/FormElements/TextArea';

storiesOf('Components/Form Elements')
  .add('Text Area', () =>
    <StoryPage title="Text Area">
      <StorySection title="Normal">
        <TextArea showLabel={boolean('Show Label',true)} label={text('Label', 'Some Text')} {...fieldProps} />
      </StorySection>

      <StorySection title="Warning">
        <TextArea showLabel={boolean('Show Label',true)} label={text('Label', 'Some Text')} {...warningFieldProps} />
      </StorySection>

      <StorySection title="Error">
        <TextArea showLabel={boolean('Show Label',true)} label={text('Label', 'Some Text')} {...errorFieldProps} />
      </StorySection>
    </StoryPage>
  );
