import * as React from 'react';
import { storiesOf } from '../../utils';
import { text } from '@storybook/addon-knobs';
import {
  fieldProps,
  warningFieldProps,
  errorFieldProps
} from './utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import TextField from '../../../app/components/FormElements/TextField';

storiesOf('Components/Form Elements')
  .add('Text Field', () =>
  (
      <StoryPage title="Text Field">
        <StorySection title="Normal">
          <TextField label={text('Label', 'Some Text')} {...fieldProps} />
        </StorySection>

        <StorySection title="Warning">
          <TextField label={text('Label', 'Some Text')} {...warningFieldProps} />
        </StorySection>

        <StorySection title="Error">
          <TextField label={text('Label', 'Some Text')} {...errorFieldProps} />
        </StorySection>
      </StoryPage>
  )  
);
