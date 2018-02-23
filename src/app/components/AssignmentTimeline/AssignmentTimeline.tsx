import * as React from 'react'
import * as moment from 'moment';
import {
    default as Timeline,
    TimelineProps
} from "../Timeline/Timeline";
import {
    Assignment,
    AssignmentDuty
} from "../../api/index";
import {
    ReactCalendarTimelineGroup,
    ReactCalendarTimelineItem
} from "react-calendar-timeline";
// import { default as AssignmentTimelineCard } from './AssignmentTimelineCard'
// import AssignmentDropRowExtension from './AssignmentDropRowExtension';
import toTitleCase from '../../infrastructure/toTitleCase';
import AssignmentDutyCard from '../AssignmentDutyCard/AssignmentDutyCard';
// import AssignmentRowActionsExtension from './AssignmentRowActionsExtension';


type TimelineAssignment = ReactCalendarTimelineGroup & Assignment;
type TimelineAssignmentDuty = ReactCalendarTimelineItem & AssignmentDuty;

export interface AssignmentTimelineProps extends TimelineProps<AssignmentDuty, Assignment> {

}

export default class AssignmentTimeline extends Timeline<AssignmentDuty, Assignment, AssignmentTimelineProps>{

    static defaultProps: Partial<AssignmentTimelineProps> = {
        sideBarHeaderTitle: "Assignments",
        sideBarHeaderComponent: (p: AssignmentTimelineProps) => (
            <div style={{ paddingTop: 10, fontSize: 18, alignContent: "center" }}>
                {p.sideBarHeaderTitle}
            </div>
        ),
        itemRenderer: (item) => (
            <AssignmentDutyCard duty={item} >
                {item.title}
            </AssignmentDutyCard>
        )
    }

    // Maps a duty to an item that can be displayed by the timeline
    protected mapItem(duty: AssignmentDuty): TimelineAssignmentDuty {
        const { assignmentId, startDateTime, endDateTime } = duty;
        const assignment = this.props.groups.find(a => a.id == assignmentId);
        const start_time = this.ensureMoment(startDateTime);
        const end_time = this.ensureMoment(endDateTime);
        return {
            ...duty,
            title: assignment ? toTitleCase(assignment.title) : "",
            group: assignmentId,
            start_time,
            end_time
        }
    }

    protected ensureMoment(dateTime: any): moment.Moment {
        if (!moment.isMoment(dateTime)) {
            return moment(dateTime);
        }
        return dateTime;
    }

    // Maps an assignment to a timeline group, nothing needed :)
    protected mapGroup(assignment: Assignment): TimelineAssignment {
        return assignment;
    }

    protected renderGroup(group: TimelineAssignment) {
        return super.renderGroup(group);
    }

    // protected getExtensions() {
    //     return (
    //         <AssignmentRowActionsExtension />
    //     )
    // }

}

