import * as React from 'react';
import moment from 'moment';
import {
    default as Timeline,
    TimelineComponentProps
} from './Timeline/Timeline';
import {
    BLANK_LOCATION,
    Location,
    AssignmentScheduleItem
} from '../api/Api';
import { ensureMoment } from '../infrastructure/momentUtils';
import { ReactCalendarTimelineItem } from 'react-calendar-timeline';
import AssignmentScheduleCard from './AssignmentScheduleCard';

interface AssignmentScheduleTimelineProps extends TimelineComponentProps<AssignmentScheduleItem, Location> {

}

class AssignmentScheduleTimeline extends Timeline<AssignmentScheduleItem, Location> {
    static defaultProps: Partial<AssignmentScheduleTimelineProps> = {
        sideBarHeaderTitle: '',
        itemRenderer: (item) => (
            <AssignmentScheduleCard assignmentId={item.assignmentId} workSectionId={item.workSectionId}>
                {item.title}
            </AssignmentScheduleCard>
        ),
        mapItem: AssignmentScheduleTimeline.mapItem,
    };

    public static mapItem(assignment: AssignmentScheduleItem, groups: Location[]) {
        const { startDateTime, endDateTime } = assignment;
        const startTime = ensureMoment(startDateTime);
        const endTime = ensureMoment(endDateTime);
        return {
            ...assignment,
            title: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
            group: assignment.locationId,
            start_time: startTime,
            end_time: endTime,
            className: 'drop-shadow-hover',
            style: {
                background: 'white',
                border: '0px'
            }
        };
    }
}

export interface AssignmentScheduleProps {
    assignments: AssignmentScheduleItem[];
    visibleTimeStart?: number;
    visibleTimeEnd?: number;
    onVisibleTimeChange?: (visibleTimeStart: number, visibleTimeEnd: number) => void;
    allowTimeChange?: boolean;
    itemRenderer?: (item: ReactCalendarTimelineItem & AssignmentScheduleItem) => React.ReactNode;
}

export default class AssignmentSchedule extends React.PureComponent<AssignmentScheduleProps> {
    render() {
        const {
            assignments = [],
            visibleTimeEnd,
            visibleTimeStart,
            itemRenderer = (item: ReactCalendarTimelineItem & AssignmentScheduleItem) => (                
                <AssignmentScheduleCard assignmentId={item.assignmentId} workSectionId={item.workSectionId}>
                    {item.id}
                </AssignmentScheduleCard>
            ),
            allowTimeChange = false
        } = this.props;
        
        return (
            <AssignmentScheduleTimeline
                allowChangeTime={allowTimeChange}
                groups={[BLANK_LOCATION]}
                items={assignments}
                mapItem={(item, groupList) => {
                    let assignment = AssignmentScheduleTimeline.mapItem(item, groupList);
                    assignment.group = BLANK_LOCATION.id;
                    return assignment;
                }}
                sidebarWidth={0}
                visibleTimeStart={moment(visibleTimeStart).valueOf()}
                visibleTimeEnd={moment(visibleTimeEnd).valueOf()}
                itemRenderer={itemRenderer}
                lineHeight={78}
            />
        );
    }
}