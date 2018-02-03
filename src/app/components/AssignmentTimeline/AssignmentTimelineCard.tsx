import * as React from 'react'
import {
    SheriffAssignment,
    WORK_SECTIONS
} from '../../api/index';
import AssignmentDragSource from '../../containers/AssignmentDragSource';
import {
    OverlayTrigger,
    Popover,
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentDetails from '../AssignmentDetails';

export interface AssignmentTimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
}
export default class AssignmentTimelineCard extends React.PureComponent<AssignmentTimelineCardProps, any>{
    render() {
        const { assignment, currentGroupId, onDropped } = this.props;
        const { title, workSectionId, gateNumber, assignmentCourt,sheriffIds=[],sherrifsRequired=1 } = assignment;

        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
                <AssignmentDetails assignment={assignment} />
            </Popover>
        );


        let backgroundColor = "";
        if (WORK_SECTIONS[workSectionId] === WORK_SECTIONS.COURT) {
            backgroundColor = "#008080";
        } else if (WORK_SECTIONS[workSectionId] === WORK_SECTIONS.ESCORTS) {
            backgroundColor = "#993399";
        } else if (WORK_SECTIONS[workSectionId] === WORK_SECTIONS.DOCUMENTS) {
            backgroundColor = "#990000";
        } else if (WORK_SECTIONS[workSectionId] === WORK_SECTIONS.GATES) {
            backgroundColor = "#e65c00";
        } else {
            backgroundColor = "#0066cc";
        }
         
        const progressValue = (sheriffIds.length / Number(sherrifsRequired))*100;

        return (
            <AssignmentDragSource
                id={assignment.id}
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                <div style={{ display: 'flex',justifyContent:'space-between', flexFlow: 'column nowrap', lineHeight: "15px", backgroundColor, width: "100%", height: "100%", position: "absolute" }}>
                    <div style={{ flex: '1' }}>
                        <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                            <Button style={{ color: "#FFF", padding: 0 }} bsStyle="link" bsSize="medium"><strong>{title} {assignmentCourt && <Glyphicon glyph="asterisk" />}</strong></Button>
                        </OverlayTrigger>
                    </div>
                    <div style={{ flex: '1' }}>
                        <i>{gateNumber}</i>
                    </div>
                    <div style={{position:"absolute",right:2,bottom:0}}>
                        {   progressValue >= 100 
                            ? <Glyphicon glyph="ok"/> 
                            : <span>{sheriffIds.length}/{Number(sherrifsRequired)}</span>
                        }
                    </div>
                </div>
            </AssignmentDragSource>
        );
    }
}
