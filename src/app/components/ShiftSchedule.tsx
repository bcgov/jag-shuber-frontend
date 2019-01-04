import * as React from 'react';
import moment from 'moment';
import {
    default as Timeline,
    TimelineComponentProps
} from './Timeline/Timeline';
import {
    Shift,
    BLANK_LOCATION,
    Location
} from '../api/Api';
import ShiftCard from './ShiftCard';
import { ensureMoment } from '../infrastructure/momentUtils';
import { ReactCalendarTimelineItem } from 'react-calendar-timeline';

interface ShiftScheduleTimelineProps extends TimelineComponentProps<Shift, Location> {

}

class ShiftScheduleTimeline extends Timeline<Shift, Location> {
    static defaultProps: Partial<ShiftScheduleTimelineProps> = {
        sideBarHeaderTitle: 'Assignments',
        itemRenderer: (item) => (
            <ShiftCard shift={item} >
                {item.title}
            </ShiftCard>
        ),
        mapItem: ShiftScheduleTimeline.mapItem,

    };

    public static mapItem(shift: Shift, groups: Location[]) {
        const { startDateTime, endDateTime } = shift;
        const startTime = ensureMoment(startDateTime);
        const endTime = ensureMoment(endDateTime);
        return {
            ...shift,
            title: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
            group: shift.locationId,
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
            allowTimeChange = false
        } = this.props;
        return (
            <ShiftScheduleTimeline
                allowChangeTime={allowTimeChange}
                groups={[BLANK_LOCATION]}
                items={shifts}
                mapItem={(item, groupList) => {
                    let shift = ShiftScheduleTimeline.mapItem(item, groupList);
                    shift.group = BLANK_LOCATION.id;
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