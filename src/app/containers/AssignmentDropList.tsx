import * as React from 'react'
import {
    default as AssignmentList,
    AssignmentListProps
} from '../components/AssignmentList'
import AssignmentDropTarget from '../containers/AssignmentDropTarget';

export interface AssignmentDropListProps extends AssignmentListProps {

}


class AssignmentDropList extends React.PureComponent<AssignmentDropListProps, {}>{
    render() {
        const { assignmentGroupId, ...restProps } = this.props;
        return (
            <AssignmentDropTarget style={{ minHeight: 300 }} targetId={assignmentGroupId}>
                <AssignmentList assignmentGroupId={assignmentGroupId} {...restProps} />
            </AssignmentDropTarget>
        )
    }
}

export default AssignmentDropList