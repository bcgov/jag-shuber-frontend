import * as React from 'react';
import {
    default as Timeline,
    TimelineComponentProps
} from './Timeline/Timeline';
import {
    Shift,
    Courthouse
} from '../api/Api';
import ShiftCard from './ShiftCard';
import { ensureMoment } from '../infrastructure/momentUtils';

interface ShiftScheduleTimelineProps extends TimelineComponentProps<Shift, Courthouse> {

}

export default class ShiftScheduleTimeline extends Timeline<Shift, Courthouse> {
    static defaultProps: Partial<ShiftScheduleTimelineProps> = {
        sideBarHeaderTitle: 'Assignments',
        itemRenderer: (item) => (
            <ShiftCard shift={item} >
                {item.title}
            </ShiftCard>
        ),
        mapItem: ShiftScheduleTimeline.mapItem
    };

    public static mapItem(shift: Shift, groups: Courthouse[]) {
        const { startDateTime, endDateTime } = shift;
        const startTime = ensureMoment(startDateTime);
        const endTime = ensureMoment(endDateTime);
        return {
            ...shift,
            title: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
            group: shift.courthouseId,
            start_time: startTime,
            end_time: endTime
        };
    }
}