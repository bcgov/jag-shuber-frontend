import * as React from 'react'
// import {
//     //Label,
//     Panel
// } from 'react-bootstrap'
// import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { SheriffAssignment } from '../../../api/index';
import { AssignmentDragSource } from '../../../containers/DragDrop';

export interface TimelineCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
    onDropped?: () => void;
}


class TimelineCard extends React.PureComponent<TimelineCardProps, any>{
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

export default TimelineCard
