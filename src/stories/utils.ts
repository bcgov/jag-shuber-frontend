import { storiesOf as storybookStoriesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

export function storiesOf(name: string) {
  return storybookStoriesOf(name, module).addDecorator(withKnobs);
}