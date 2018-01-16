import * as React from 'react'
// import {
//     //Label,
//     Panel
// } from 'react-bootstrap'
// import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { SheriffAssignment } from '../../../../api/index';
import AssignmentDragSource from '../../dragdrop/AssignmentDragSource';

export interface AssignmentTimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
}

export default class AssignmentTimelineCard extends React.PureComponent<AssignmentTimelineCardProps, any>{
    render() {
        const { assignment, currentGroupId, onDropped } = this.props;
        const { title,description } = assignment;

        return (
            <AssignmentDragSource                 
                id={assignment.id} 
                currentGroupId={currentGroupId}
                endDrag={() => onDropped && onDropped()}>
                    <div style={{ lineHeight:"15px", backgroundColor: "#228877", width: "100%",height:"100%",position:"absolute" }}>
                        {title}<br/>
                        <i>{description}</i>
                    </div>
            </AssignmentDragSource>
        );
    }
}
