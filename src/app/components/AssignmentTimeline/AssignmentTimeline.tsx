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
// import toTitleCase from '../../infrastructure/toTitleCase';


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
        )
    }

    // Maps a duty to an item that can be displayed by the timeline
    protected mapItem(duty: AssignmentDuty): TimelineAssignmentDuty {
        const { assignmentId, startDateTime, endDateTime } = duty;
        const start_time = this.ensureMoment(startDateTime);
        const end_time = this.ensureMoment(endDateTime);
        return {
            ...duty,
            title: "Hello",
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

    
    protected renderItem(item: TimelineAssignmentDuty) {
        const { id, title } = item;
        const backgroundColor = "#008866"
        return (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column nowrap', lineHeight: "15px", backgroundColor, width: "100%", height: "100%", position: "absolute" }}>
                <div style={{ flex: '1' }}>
                    {title}
                    {/* <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                <Button style={{ color: "#FFF", padding: 0 }} bsStyle="link" bsSize="medium"><strong>{title} {assignmentCourt && <Glyphicon glyph="asterisk" />}</strong></Button>
            </OverlayTrigger> */}
                </div>
                {/* <div style={{ flex: '1' }}>
            <i>{gateNumber}</i>
        </div>
        <div style={{position:"absolute",right:2,bottom:0}}>
            {   progressValue >= 100 
                ? <Glyphicon glyph="ok"/> 
                : <span>{sheriffIds.length}/{Number(sherrifsRequired)}</span>
            }
        </div> */}
            </div>
        )
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
    //         <AssignmentDropRowExtension />
    //     )
    // }

}

