import * as React from 'react';
import {
    default as Timeline,
    TimelineComponentProps
} from '../Timeline/Timeline';
import {
    AssignmentDuty,
    BaseAssignment
} from '../../api';
import toTitleCase from '../../infrastructure/toTitleCase';
import AssignmentDutyCard from '../AssignmentDutyCard/AssignmentDutyCard';
import { ensureMoment } from '../../infrastructure/momentUtils';
import { getWorkSectionColour } from '../../api/utils';
import { getForegroundColor } from '../../infrastructure/colorUtils';

export interface AssignmentTimelineProps extends TimelineComponentProps<AssignmentDuty, BaseAssignment> {

}

export default class extends Timeline<AssignmentDuty, BaseAssignment>{

    static defaultProps: Partial<AssignmentTimelineProps> = {
        sideBarHeaderTitle: 'Assignments',
        itemRenderer: (item) => (
            <AssignmentDutyCard duty={item} >
                {item.title}
            </AssignmentDutyCard>
        ),
        mapItem: (item, groups) => {
            const { id, startDateTime, endDateTime } = item;
            const assignment = groups.find(a => a.id === id);
            const startTime = ensureMoment(startDateTime);
            const endTime = ensureMoment(endDateTime);
            let style: React.CSSProperties = {
                background: 'transparent'
            };
            if (assignment) {
                const workSectionColour = getWorkSectionColour(assignment.workSectionId);
                style.border = `1px solid ${workSectionColour}`;
                style.color = getForegroundColor(workSectionColour);
            }
            return {
                ...item,
                title: assignment ? toTitleCase(assignment.title) : '',
                group: id,
                start_time: startTime,
                end_time: endTime,
                style
            };
        }
    };
}