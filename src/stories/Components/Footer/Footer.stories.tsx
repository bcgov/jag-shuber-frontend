import * as React from 'react';
import { storiesOf } from '../../utils';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import Legend from '../../../app/components/Legend/Legend';

storiesOf('Components/Footer')
    .add('Legend', () =>
        (
            <StoryPage title="Legend">
                <StorySection title="Legend">
                    <Legend />
                </StorySection>
            </StoryPage>
        )
    );
