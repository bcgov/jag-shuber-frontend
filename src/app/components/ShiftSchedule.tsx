import * as React from 'react';
import moment from 'moment';
import {
    default as Timeline,
    TimelineComponentProps
} from './Timeline/Timeline';
import {
    Shift, Group, WorkSection
} from '../api/Api';
import ShiftCard from './ShiftCard';
import { ensureMoment } from '../infrastructure/momentUtils';
import { ReactCalendarTimelineItem } from 'react-calendar-timeline';

interface ShiftScheduleTimelineProps extends TimelineComponentProps<Shift, Group> {

}

class ShiftScheduleTimeline extends Timeline<Shift, Group> {
    static defaultProps: Partial<ShiftScheduleTimelineProps> = {
        sideBarHeaderTitle: 'Assignments',
        itemRenderer: (item) => (
            <ShiftCard shift={item} >
                {item.title}
            </ShiftCard>
        ),
        mapItem: ShiftScheduleTimeline.mapItem,

    };

    public static mapItem(shift: Shift, groups: Group[]) {
        const { startDateTime, endDateTime } = shift;
        const startTime = ensureMoment(startDateTime);
        const endTime = ensureMoment(endDateTime);
        return {
            ...shift,
            title: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
            group: getShiftGroupId(shift),
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

export interface ShiftScheduleProps {
    shifts: Shift[];
    visibleTimeStart?: number;
    visibleTimeEnd?: number;
    onVisibleTimeChange?: (visibleTimeStart: number, visibleTimeEnd: number) => void;
    allowTimeChange?: boolean;
    itemRenderer?: (item: ReactCalendarTimelineItem & Shift) => React.ReactNode;
}

function getShiftGroupId(s: Shift) {
    return `${WorkSection.getWorkSectionSortCode(s.workSectionId)}:${s.assignmentId}`;
}

export default class ShiftSchedule extends React.PureComponent<ShiftScheduleProps> {
    render() {
        const {
            shifts = [],
            visibleTimeEnd,
            visibleTimeStart,
            itemRenderer = (item: ReactCalendarTimelineItem & Shift) => (
                <ShiftCard shift={item} >
                    {item.sheriffId}
                </ShiftCard>
            ),
            allowTimeChange = true
        } = this.props;

        const groups: Group[] = [];
        shifts.filter(s =>
            // Create groups for visible shifts only
            moment(s.startDateTime).valueOf() >= moment(visibleTimeStart).valueOf() &&
            moment(s.startDateTime).valueOf() <= moment(visibleTimeEnd).valueOf())
        .forEach(s => {
            const id = getShiftGroupId(s);
            // Unique groups only
            if (!groups.find(g => g.id == id)) {
                groups.push({ id, name: '' });
            }
        });

        return (
            <ShiftScheduleTimeline
                allowChangeTime={true}
                groups={groups}
                items={shifts}
                mapItem={(item, groupList) => {
                    let shift = ShiftScheduleTimeline.mapItem(item, groupList);
                    return shift;
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
