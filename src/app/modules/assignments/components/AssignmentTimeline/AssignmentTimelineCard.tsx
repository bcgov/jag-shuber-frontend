import * as React from 'react'
// import {
//     //Label,
//     Panel
// } from 'react-bootstrap'
// import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { 
    SheriffAssignment,
    // ASSIGNMENT_TYPES 
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
        const { assignment, currentGroupId, onDropped, assignmentColor = () => {
            return "#FFF"} } = this.props;
        const { assignmentType, courtRoom } = assignment;

        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
               <AssignmentView assignment={assignment} />
            </Popover>
        );

        
        // const  assignmentColor = (return "#FFF");
        // if(assignmentType === ASSIGNMENT_TYPES.courtSecurity){
        //     assignmentColor = "#486446";
        // }else if(assignmentType === ASSIGNMENT_TYPES.escortServices){
        //     assignmentColor = "#486446";
        // }else if(assignmentType === ASSIGNMENT_TYPES.documentServices){
        //     assignmentColor = "#486446";
        // }else if (assignmentType === ASSIGNMENT_TYPES.gateSecurity){
        //     assignmentColor = "#486446";
        // }else{
        //     assignmentColor = "#5091cd"; // other
        // }

        return (
            <AssignmentDragSource                 
                id={assignment.id} 
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                    <div style={{ lineHeight:"15px", backgroundColor: {assignmentColor}, width: "100%",height:"100%",position:"absolute" }}>
                        <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                            <Button style={{color:"#FFF", padding:0}} bsStyle="link" bsSize="small">{assignmentType}</Button>
                        </OverlayTrigger><br/>
                        <i>{courtRoom}</i>
                    </div>
                    
            </AssignmentDragSource>
        );
    }
}
