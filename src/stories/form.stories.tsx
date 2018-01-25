import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs,text } from '@storybook/addon-knobs';
// import { linkTo } from '@storybook/addon-links';

import { AssignmentTypeSelector,RequiredTrainingChecklist } from '../app/components/Form';
import { WrappedFieldProps, WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

function generateFieldProps(inputOverrides: Partial<WrappedFieldInputProps> = {}, metaOverrides: Partial<WrappedFieldMetaProps> = {}): WrappedFieldProps {
  const defaultProps: WrappedFieldProps = {
    input: {
      checked: false,
      name: 'unnamed',
      value: undefined,
      onBlur: action("blur"),
      onChange: action("change"),
      onDragStart: action("dragStart"),
      onDrop: action("drop"),
      onFocus: action("blur")
    },
    meta: {
      active: false,
      autofilled: false,
      asyncValidating: false,
      dirty: false,
      dispatch: () => { },
      error: undefined,
      form: 'someFormName',
      initial: undefined,
      invalid: false,
      pristine: false,
      submitting: false,
      submitFailed: false,
      touched: false,
      valid: false,
      visited: false,
      warning: undefined
    }
  }

  defaultProps.input = Object.assign(defaultProps.input, inputOverrides);
  defaultProps.meta = Object.assign(defaultProps.meta, metaOverrides);
  return defaultProps;
}

const fieldProps = generateFieldProps();
const errorFieldProps = generateFieldProps({}, { error: "Error With something", touched: true })
const warningFieldProps = generateFieldProps({}, { warning: "Warning With something", touched: true })

function createStory(name: string) {
  return storiesOf(name, module).addDecorator(withKnobs);
}

createStory('Form Elements/Assignment Type Selector')
  .add('Standard', () => <AssignmentTypeSelector label={text('Label','Assignment Type')} {...fieldProps} />)
  .add('With Warning', () => <AssignmentTypeSelector label={text('Label','Assignment Type')} {...warningFieldProps} />)
  .add('With Error', () => <AssignmentTypeSelector label={text('Label','Assignment Type')} {...errorFieldProps} />)


createStory('Form Elements/Required training Selector')
  .add('Standard', () => <RequiredTrainingChecklist label={text('Label','Required Training')} {...fieldProps} />)
  .add('With Warning', () => <RequiredTrainingChecklist label={text('Label','Required Training')} {...warningFieldProps} />)
  .add('With Error', () => <RequiredTrainingChecklist label={text('Label','Required Training')} {...errorFieldProps} />)
