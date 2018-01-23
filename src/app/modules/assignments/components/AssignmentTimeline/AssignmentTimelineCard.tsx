import * as React from 'react'
import { 
    SheriffAssignment,
    ASSIGNMENT_TYPES 
} from '../../../../api/';
import AssignmentDragSource from '../../dragdrop/AssignmentDragSource';
import { 
    OverlayTrigger,
    Popover,
    Button,
    Glyphicon 
} from 'react-bootstrap';
import {default as AssignmentView} from '../AssignmentView';


export interface AssignmentTimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
}
export default class AssignmentTimelineCard extends React.PureComponent<AssignmentTimelineCardProps, any>{
    render() {
        const { assignment, currentGroupId, onDropped } = this.props;
        const { assignmentType, courtRoom, gateNumber, assignmentCourt } = assignment;

        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
               <AssignmentView assignment={assignment} />
            </Popover>
        );

        
        let  backgroundColor = "";
        if(assignmentType === ASSIGNMENT_TYPES.courtSecurity){
            backgroundColor = "#008080";
        }else if(assignmentType === ASSIGNMENT_TYPES.escortServices){
            backgroundColor = "#993399";
        }else if(assignmentType === ASSIGNMENT_TYPES.documentServices){
            backgroundColor = "#990000";
        }else if (assignmentType === ASSIGNMENT_TYPES.gateSecurity){
            backgroundColor = "#e65c00";
        }else{
            backgroundColor = "#0066cc"; 
        }

        return (
            <AssignmentDragSource                 
                id={assignment.id} 
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                    <div style={{ lineHeight:"15px", backgroundColor, width: "100%",height:"100%",position:"absolute" }}>
                        <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                            <Button style={{color:"#FFF", padding:0}} bsStyle="link" bsSize="medium"><strong>{assignmentType}</strong></Button>
                        </OverlayTrigger>{assignmentCourt && <Glyphicon glyph="asterisk"/>}<br/>
                        <i>{courtRoom} {gateNumber}</i>
                    </div>
                    
            </AssignmentDragSource>
        );
    }
}
