import * as React from 'react'
// import {
//     //Label,
//     Panel
// } from 'react-bootstrap'
// import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { 
    SheriffAssignment,
    ASSIGNMENT_TYPES 
} from '../../../../api/index';
import AssignmentDragSource from '../../dragdrop/AssignmentDragSource';
import { 
    OverlayTrigger,
    Popover,
    Button 
} from 'react-bootstrap';
import {default as AssignmentView} from '../AssignmentView';

export interface AssignmentTimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
    assignmentColor?: () => string;
}
export default class AssignmentTimelineCard extends React.PureComponent<AssignmentTimelineCardProps, any>{
    render() {
        const { assignment, currentGroupId, onDropped } = this.props;
        const { assignmentType, courtRoom } = assignment;

        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
               <AssignmentView assignment={assignment} />
            </Popover>
        );

        
        let  backgroundColor = "";
        if(assignmentType === ASSIGNMENT_TYPES.courtSecurity && !assignment.assignmentCourt){
            backgroundColor = "#00cc66";
        }else if(assignmentType === ASSIGNMENT_TYPES.courtSecurity && assignment.assignmentCourt){
            backgroundColor = "#6600ff";
        }else if(assignmentType === ASSIGNMENT_TYPES.escortServices){
            backgroundColor = "#660066";
        }else if(assignmentType === ASSIGNMENT_TYPES.documentServices){
            backgroundColor = "#990000";
        }else if (assignmentType === ASSIGNMENT_TYPES.gateSecurity){
            backgroundColor = "#ff9900";
        }else{
            backgroundColor = "#0000e6"; 
        }

        return (
            <AssignmentDragSource                 
                id={assignment.id} 
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                    <div style={{ lineHeight:"15px", backgroundColor, width: "100%",height:"100%",position:"absolute" }}>
                        <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                            <Button style={{color:"#FFF", padding:0}} bsStyle="link" bsSize="small">{assignmentType}</Button>
                        </OverlayTrigger><br/>
                        <i>{courtRoom}</i>
                    </div>
                    
            </AssignmentDragSource>
        );
    }
}
