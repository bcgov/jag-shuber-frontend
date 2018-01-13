import * as React from 'react'
import { default as AssignmentList, AssignmentListProps } from './AssignmentList'
import AssignmentDropTarget from '../dragdrop/AssignmentDropTarget';

export interface DropAssignmentListProps extends AssignmentListProps {

}


class DropAssignmentList extends React.PureComponent<DropAssignmentListProps, {}>{

    render() {
        const { assignmentGroupId, ...restProps } = this.props;
        return (
            <AssignmentDropTarget style={{minHeight:300}} targetId={assignmentGroupId}>
                <AssignmentList assignmentGroupId={assignmentGroupId} {...restProps} />
                {/* {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')} */}
            </AssignmentDropTarget>
        )
    }
}

export default DropAssignmentList