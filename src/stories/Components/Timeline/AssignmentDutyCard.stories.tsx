import * as React from 'react';
import { storiesOf } from '../../utils';
import { number, array } from '@storybook/addon-knobs';
import StoryPage from '../../StoryUI/StoryPage';
import StorySection from '../../StoryUI/StorySection';
import AssignmentDutyCard from '../../../app/components/AssignmentDutyCard';
import { AssignmentDuty } from '../../../app/api';
import * as moment from 'moment'
import TimelineCard from '../../../app/components/Timeline/TimelineCard';
import SheriffDutyBarList from '../../../app/components/SheriffDutyBarList/SheriffDutyBarList';

const blank_duty: AssignmentDuty = {
    id: 0,
    assignmentId: 0,
    sheriffsRequired: 1,
    sheriffIds: [],
    startDateTime: moment(),
    endDateTime: moment()
};

class TimelineCardWrapper extends React.PureComponent {
    render() {
        return (
            <div style={{
                height: 70,
                display: 'block',
                fontSize: 12,
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
            }}>
                <TimelineCard>
                    {this.props.children}
                </TimelineCard>
            </div>
        )
    }
}

const DutyBarList = (p: any) => <SheriffDutyBarList onRemove={(id) => alert(`Remove ${id}`)} {...p} />

storiesOf('Timeline')
    .add('Assignment Duty Card', () => {
        return (
            <StoryPage title="Assignment Duty Card" >
                <StorySection title="Unassigned" >
                    <TimelineCardWrapper>
                        <AssignmentDutyCard duty={{
                            ...blank_duty,
                            sheriffIds: array('Sheriff Ids', [], 'partial'),
                            sheriffsRequired: number("Sheriffs Required", 3)
                        }}
                            SheriffAssignmentRenderer={DutyBarList}
                        />
                    </TimelineCardWrapper>
                </StorySection>

                <StorySection title="Partially Assigned" >
                    <TimelineCardWrapper>
                        <AssignmentDutyCard duty={{
                            ...blank_duty,
                            sheriffIds: array('Sheriff Ids', [1, 2]),
                            sheriffsRequired: number("Sheriffs Required", 3)
                        }}
                            SheriffAssignmentRenderer={DutyBarList}

                        />
                    </TimelineCardWrapper>
                </StorySection>

                <StorySection title="Fully Assigned" >
                    <TimelineCardWrapper>
                        <AssignmentDutyCard duty={{
                            ...blank_duty,
                            sheriffIds: array('Sheriff Ids', [1, 2, 3]),
                            sheriffsRequired: number("Sheriffs Required", 3)
                        }}
                            SheriffAssignmentRenderer={DutyBarList}
                        />
                    </TimelineCardWrapper>
                </StorySection>

                <StorySection title="Over Assigned" >
                    <TimelineCardWrapper>
                        <AssignmentDutyCard duty={{
                            ...blank_duty,
                            sheriffIds: array('Sheriff Ids', [1, 2, 3, 4]),
                            sheriffsRequired: number("Sheriffs Required", 3)
                        }}
                            SheriffAssignmentRenderer={DutyBarList}
                        />
                    </TimelineCardWrapper>
                </StorySection>
            </StoryPage>
        )
    });
