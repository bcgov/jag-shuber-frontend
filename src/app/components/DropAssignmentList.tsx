import * as React from 'react'
import {
    default as AssignmentList,
    AssignmentListProps
} from './AssignmentList'
import AssignmentDropTarget from '../containers/AssignmentDropTarget';

export interface DropAssignmentListProps extends AssignmentListProps {

}


class DropAssignmentList extends React.PureComponent<DropAssignmentListProps, {}>{
    render() {
        const { assignmentGroupId, ...restProps } = this.props;
        return (
            <AssignmentDropTarget style={{ minHeight: 300 }} targetId={assignmentGroupId}>
                <AssignmentList assignmentGroupId={assignmentGroupId} {...restProps} />
            </AssignmentDropTarget>
        )
    }
}

export default DropAssignmentList