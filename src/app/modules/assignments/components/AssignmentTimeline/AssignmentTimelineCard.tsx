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
        const { title } = assignment;

        return (
            <AssignmentDragSource endDrag={() => onDropped && onDropped()} id={assignment.id} currentGroupId={currentGroupId}>
                <div style={{ backgroundColor: "#228877", width: "100%" }}>
                    {title}
                </div>
            </AssignmentDragSource>
        );
    }
}
