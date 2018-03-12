import * as React from 'react';
import { Assignment } from '../api/index';
import AssignmentDutyAddModal from '../containers/AssignmentDutyAddModal';

export interface AssignmentCardProps {
    assignment: Assignment;
}

export default class AssignmentCard extends React.PureComponent<AssignmentCardProps, {}> {
    render() {
        const { assignment: { title } } = this.props;
        return (
            <div>
                <AssignmentDutyAddModal />
                {title}
            </div>
        );
    }
}
