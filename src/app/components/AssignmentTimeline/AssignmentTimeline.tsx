import * as React from 'react';
import {
    default as Timeline,
    TimelineComponentProps
} from '../Timeline/Timeline';
import {
    Assignment,
    AssignmentDuty
} from '../../api/index';
import toTitleCase from '../../infrastructure/toTitleCase';
import AssignmentDutyCard from '../AssignmentDutyCard/AssignmentDutyCard';
import { ensureMoment } from '../../infrastructure/momentUtils';

export interface AssignmentTimelineProps extends TimelineComponentProps<AssignmentDuty, Assignment> {

}

export default class extends Timeline<AssignmentDuty, Assignment>{

    static defaultProps: Partial<AssignmentTimelineProps> = {
        sideBarHeaderTitle: 'Assignments',
        itemRenderer: (item) => (
            <AssignmentDutyCard duty={item} >
                {item.title}
            </AssignmentDutyCard>
        ),
        mapItem: (item, groups) => {
            const { assignmentId, startDateTime, endDateTime } = item;
            const assignment = groups.find(a => a.id === assignmentId);
            const startTime = ensureMoment(startDateTime);
            const endTime = ensureMoment(endDateTime);
            return {
                ...item,
                title: assignment ? toTitleCase(assignment.title) : '',
                group: assignmentId,
                start_time: startTime,
                end_time: endTime
            };
        }
    };
}