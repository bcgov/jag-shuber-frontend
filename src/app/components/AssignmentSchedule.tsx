import * as React from 'react';
import moment from 'moment';
import {
    default as Timeline,
    TimelineComponentProps
} from './Timeline/Timeline';
import {
    AssignmentScheduleItem,
    Group,
    WorkSection
} from '../api/Api';
import { ensureMoment } from '../infrastructure/momentUtils';
import { ReactCalendarTimelineItem } from 'react-calendar-timeline';
import AssignmentScheduleCard from './AssignmentScheduleCard';

interface AssignmentScheduleTimelineProps extends TimelineComponentProps<AssignmentScheduleItem, Group> {

}

class AssignmentScheduleTimeline extends Timeline<AssignmentScheduleItem, Group> {
    static defaultProps: Partial<AssignmentScheduleTimelineProps> = {
        sideBarHeaderTitle: '',
        itemRenderer: (item) => (
            <AssignmentScheduleCard assignmentId={item.assignmentId} workSectionId={item.workSectionId}>
                {item.title}
            </AssignmentScheduleCard>
        ),
        mapItem: AssignmentScheduleTimeline.mapItem,
    };

    public static mapItem(assignment: AssignmentScheduleItem, groups: Group[]) {
        const { startDateTime, endDateTime } = assignment;
        const startTime = ensureMoment(startDateTime);
        const endTime = ensureMoment(endDateTime);
        return {
            ...assignment,
            title: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
            group: getAssignmentGroupId(assignment),
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

function getAssignmentGroupId(s: AssignmentScheduleItem) {
    return `${WorkSection.getWorkSectionSortCode(s.workSectionId)}:${s.assignmentId}`;
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
        
        const groups: Group[] = [];
        assignments.forEach(s => { 
            const id = getAssignmentGroupId(s);
            // Unique groups only
            if (!groups.find(g => g.id == id)) {
                groups.push({ id, name: '' });
            }
        });

        return (
            <AssignmentScheduleTimeline
                allowChangeTime={allowTimeChange}
                groups={groups}
                items={assignments}
                mapItem={(item, groupList) => {
                    let assignment = AssignmentScheduleTimeline.mapItem(item, groupList);
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